const Server = require('./lib/Server');

const server = new Server({
  port: 2407,
  dbPath: './test'
})

server.run();
