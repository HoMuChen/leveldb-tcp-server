const util = require('util');
const EventEmitter = require('events');
const Parser = require('redis-parser');

function Client(socket, controller) {
  this.socket = socket;
  this.controller = controller;
  this.parser = createParser(this);

  socket.on('end', this.socketOnEnd.bind(this))
  socket.on('data', this.socketOnData.bind(this))

  this.on('err', this.onError.bind(this))
}

util.inherits(Client, EventEmitter);

function createParser(self) {
  return new Parser({
    returnReply: function (data) {
      self.parserOnCommand(data);
    },
    returnError: function (err) {
      self.parserOnError(err);
    },
    returnFatalError: function (err) {
      self.parserOnError(err)
    },
    returnBuffers: false,
    stringNumbers: false
  });
}

Client.prototype.socketOnData = function(buffer) {
  try {
    this.parser.execute(buffer);
  } catch(e) {
    this.emit('err', e)
  }
}

Client.prototype.parserOnCommand = async function(command) {
  try {
    const result = await this.controller.exec(command);

    this.socket.write(result);
  } catch(err) {
    this.emit('err', err)
  }
}

Client.prototype.parserOnError = function(err) {
  this.emit('error', err);
};

Client.prototype.socketOnEnd = function() {
  this.socket.unref();
}

Client.prototype.onError = function(err) {
  this.socket.write('-' + err);
}

module.exports = Client;
