# leveldb-tcp-server

A redis compatible protocal levelDB tcp server

## Usage

    $ npm install leveldb-tcp-server

```javascript
const Server = require('leveldb-tcp-server');

const server = new Server({
  port: 2407,
  dbPath: './test'
})

server.run();

```

or 

    $ git clone https://github.com/HoMuChen/leveldb-tcp-server.git
    $ cd leveldb-tcp-server
    $ npm run start

this script will default run a server listening on port <b>2407</b> and create a directory <b>test</b> for the leveldb data.

## Client access

Application protocal is compatible with redis protocal, so we can use redis client library to access db.

```javascript
const redis = require('redis')

const client = redis.createClient({ port: 2407 });

client.set("key", "123", (err, result) => {
  client.get("key", (err, result) => {
    console.log(result)
  });
});
```

For now, I only implement the <b>get</b>, <b>set</b> and <b>del</b> command.

## Author

HoMuchen - b98901052@ntu.edu.tw
