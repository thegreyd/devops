var redis = require('redis');
var client = redis.createClient(6379, process.argv[2], {});

client.set(process.argv[3], process.argv[4]);

client.quit();