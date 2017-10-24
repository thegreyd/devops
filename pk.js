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
            var array = val.split('');
            array.forEach(function(char, i) { 
                if (char === "k") array[i] = "j"; 
            });
            return array.join('');
        }
    }
};

fuzzer.seed(0);
var markDown = fs.readFileSync('LocalDateConverter.java','utf-8');
let mutuatedString = fuzzer.mutate.string(markDown);
fs.writeFileSync('LocalDateConverter.java', mutuatedString, "utf8");
