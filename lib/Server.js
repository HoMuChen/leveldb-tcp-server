const net = require('net');

const Client = require('./Client');
const DB = require('./DB');
const Controller = require('./Controller');

const PORT = process.env['PORT'] || 7777;
const DB_PATH = process.env['DB_PATH']

function Server(options) {
  this.port = options.port || PORT;
  this.dbPath = options.dbPath || DB_PATH;

  if (!this.dbPath) {
    console.log('dbPath is required...');
    process.exit(1);
  }

  this.db = new DB(this.dbPath);
  this.controller = new Controller(this.db);
  this.server = net.createServer();

  this.server.on('connection', socket => {
    const client = new Client(socket, this.controller);
  })
}

Server.prototype.run = function() {
  this.server.listen(this.port, () => {
    console.log('Server is listening on port: ', this.port)
  });
}

module.exports = Server;
