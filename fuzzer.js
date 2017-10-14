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
            // replace all < with >
            val = val.replace(new RegExp('<', 'g'),'>');
            // replace all 0 with 1
            val = val.replace(new RegExp('0', 'g'),'1');
            // replace all == with !=
            val = val.replace(new RegExp('==', 'g'),'!=');
            // replace all strings with helloworld12
            val = val.replace(new RegExp('".*?"', 'g'),'"helloworld12"');
            console.log(val);
            return val;
        }
    }
};

fuzzer.seed(0);
var java = fs.readFileSync('sample.java','utf-8');
let mutuated_java = fuzzer.mutate.string(java);
fs.writeFileSync('sample.java', mutuated_java, 'utf8');