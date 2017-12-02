var express = require('express');
var app = express();
var path = require('path');

app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/less', express.static(path.join(__dirname, 'less')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));

app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.listen(3000);
