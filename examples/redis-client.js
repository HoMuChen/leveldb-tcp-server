const redis = require('redis')

const client = redis.createClient({ port: 6666 });

client.set("key", "123", (err, result) => {
  client.get("key", (err, result) => {
    console.log(result)
  });
});
