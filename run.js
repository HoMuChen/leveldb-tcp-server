const Server = require('./lib/Server');

const server = new Server({
  port: 6666,
  dbPath: './test'
})

server.run();
