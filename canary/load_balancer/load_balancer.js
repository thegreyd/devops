var express = require('express');
var app = express(); 

var redis = require('redis');
var client = redis.createClient(6379, process.argv[2], {});

// client.rpush("host_list", host);
// client.lpop("host_list", function(err,host) {})

app.get('/', function(req,res) {
	// res.redirect("http://www.google.com");
	client.lpop("host_list", function(err,data) {
		if (err) {
			res.write("No host found!");
			res.end();
		} else {
			client.rpush(data);
			res.redirect(data);
		}
	});
});

app.listen(7999);