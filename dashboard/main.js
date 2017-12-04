var express = require('express');
var app = express();
var path = require('path');
var request = require('request')
var mustacheExpress = require('mustache-express');
var fs = require('fs')

app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/less', express.static(path.join(__dirname, 'less')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/pages')

app.get('/dependency', function(req, res){
	request('http://54.201.183.218:3002/pingdependency', function (error, response, body) {
		data = "";
		JSON.parse(response["body"]).forEach(function(row) {
			data+=	"<tr>" + 
			"<td>" + row["moduleName"] + "</td>" + 
			"<td>" + row["unused"] + "</td>" + 
			"<td>" + row["latest"] + "</td>" + 
			"<td>" + row["installed"] + "</td>" + 
			"<td>" + row["bump"] + "</td>" + 
			"</tr>"
		});
		res.render('dependency', {message: data});
	})
	
});

app.get('/usage', function(req, res){
	var getData = function(db, callback) {
		var collection = db.collection('ping');
		collection.find({}, {timestamp:1, cpu:1, memory:1, disk:1}).sort({_id:1}).limit(50).toArray(function(err, result) {
			callback(result);
		});
	}
	var MongoClient = require('mongodb').MongoClient
	// Connection URL
	var url = 'mongodb://localhost:27017/orkdb';
	// Use connect method to connect to the Server
	var data;
	MongoClient.connect(url, function(err, db) {
		getData(db, function(data) {
			res.render('usage', {message: JSON.stringify(data)})
			db.close();
		});
	});
})

app.get('/flame', function(req, res) {
	fs.readFile('./data/timestamps.txt', 'utf8', function(err, data){
		data = data.split('\n')
		console.log(data[data.length-1])
		options = ""
		data.forEach(function(row){
			options+="<option>"+row+"</option>"
		})
		res.render('flame', {message: options})
	});
	
	
});

app.get('/network', function(req, res) {
	var spawn = require("child_process").spawn;
	var process = spawn('python2',["/home/ubuntu/csc_519_devops/port.py"])
	process.stdout.on("data", function(data){
		data = String(data).split('\n')
		content = ""
		data.forEach(function(row){
			row = row.split('\t')
			if (row[0].length > 0) {
				content += "<tr>"+
						"<td>"+row[0]+"</td>"+
						"<td>"+row[1]+"</td>"+
						"</tr>"	
			}
			
		})
		res.render('network', {message: content})
	})

});

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.listen(3000);