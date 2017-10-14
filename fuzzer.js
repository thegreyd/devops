var Random = require('random-js');
var fs = require('fs');

var fuzzer = {
    random : new Random(Random.engines.mt19937().seed(0)),
    
    seed: function (kernel) {
        fuzzer.random = new Random(Random.engines.mt19937().seed(kernel));
    },

    mutate: {
        string: function(val) {
            // MUTATE IMPLEMENTATION HERE
            val = val.replace(new RegExp('<', 'g'),'>');
            val = val.replace(new RegExp('0', 'g'),'1');
            val = val.replace(new RegExp('==', 'g'),'!=');
            console.log(val);
            return val;
        }
    }
};

fuzzer.seed(0);
var java = fs.readFileSync('sample.java','utf-8');
let mutuated_java = fuzzer.mutate.string(java);
fs.writeFileSync('sample.java', mutuated_java, 'utf8');