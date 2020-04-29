const level = require('level');

function DB(path) {
  this.store = level(path);
}

DB.prototype.get = function get(key) {
  return new Promise((resolve, reject) => {
    this.store.get(key, (err, value) => {
      if (err) {
        return err.notFound
          ? resolve(null)
          : reject(err);
      }

      resolve(value)
    })
  })
}

DB.prototype.set = function set(key, value) {
  return new Promise((resolve, reject) => {
    this.store.put(key, value, (err, value) => {
      if (err) {
        return reject(err);
      }

      resolve('OK')
    })
  })
}

DB.prototype.del = function del(key, value) {
  return new Promise((resolve, reject) => {
    this.store.del(key, (err, value) => {
      if (err) {
        reject(err);
      }

      resolve('OK')
    })
  })
}

module.exports = DB;
