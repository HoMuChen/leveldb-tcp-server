function Controller(db) {
  this.db = db;
}

Controller.prototype.exec = function exec(command) {
  switch(command[0].toUpperCase()) {
    case 'GET':
      return this.get(command);
    case 'SET':
      return this.set(command);
    case 'DEL':
      return this.del(command);
    default:
      return '+OK\r\n'
  }
}

Controller.prototype.get = async function get(command) {
  const value = await this.db.get(command[1]);

  return value === null
    ? '$-1\r\n'
    : '$' + Buffer.from(value).length + '\r\n' + value + '\r\n'
}

Controller.prototype.set = async function set(command) {
  await this.db.set(command[1], command[2]);

  return '+OK\r\n'
}

Controller.prototype.del = async function del(command) {
  await this.db.del(command[1]);

  return ':1\r\n'
}

module.exports = Controller;
