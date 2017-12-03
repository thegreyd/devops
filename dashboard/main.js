var express = require('express');
var app = express();
var path = require('path');
var request = require('request')
var templ = require('simple-html-template')

app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/less', express.static(path.join(__dirname, 'less')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

app.engine('html', templ)
app.set('views', 'pages')
app.set('view engine', 'html')
app.set('open_tag', '<?')
app.set('close_tag', '/?>')

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
		//res.sendfile('pages/dependency.html');
	})
	
});

app.get('/usage', function(req, res){
	var MongoClient = require('mongodb').MongoClient
 	var assert = require('assert');
	// Connection URL
	var url = 'mongodb://localhost:27017/orkdb';
	// Use connect method to connect to the Server
	var data;
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  //data = db.ping.count()
	  console.log("Connected correctly to server");
	 
	  db.close();
	
	res.render('usage', {message: data});
});
})

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.listen(3000);
