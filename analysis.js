var random = require("random-js")();
var fs = require('fs');
//var esprima = require('esprima');
//var estraverse = require('estraverse');

// Assign passed or failed randomly
if (random.integer(1,100) < 50) {
	console.log('PASSED');
} else {
	console.log('FAILED');
}
