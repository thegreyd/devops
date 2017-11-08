var redis = require('redis');
var client = redis.createClient(6379, process.argv[2], {});
client.rpush("host_list", process.argv[3]);
client.quit();

// if (Math.random() > 0.7) {
// 	console.log("V2");
// } else {
// 	console.log("V1");
// }

// var client = redis.createClient(6379, process.argv[2], {});
// client.lpop("host_list", function(err,data) {
// 	console.log(data);
// });
// client.quit();