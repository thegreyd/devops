var express = require('express');
var app = express(); 

var redis = require('redis');
var client = redis.createClient(6379, process.argv[2], {});

app.get('/', function(req,res) {
	client.get("alert", function(err,alert) {
		if(err || !alert) {
			if (Math.random() > 0.7) {
				client.get("v2_host", function(err,host) {
					res.redirect("http://"+host);
				});
			} else {
				client.get("v1_host", function(err,host) {
					res.redirect("http://"+host);
				});
			}
		} else {
			client.get("v1_host", function(err,host) {
				res.redirect("http://"+host);
			});
		}
	});
});

app.get('/alert', function(req,res) {
	client.set("alert","yes");
	res.write("Alert set");
	res.end();
});

app.listen(7999);