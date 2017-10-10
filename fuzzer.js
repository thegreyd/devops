var Random = require('random-js')
    fs = require('fs');

var fuzzer = 
{
    random : new Random(Random.engines.mt19937().seed(0)),
    
    seed: function (kernel)
    {
        fuzzer.random = new Random(Random.engines.mt19937().seed(kernel));
    },

    mutate:
    {
        string: function(val)
        {
            // MUTATE IMPLEMENTATION HERE
            var array = val.split('');

            do {

                if( fuzzer.random.bool(0.05) )
                {
                    array.reverse();
                }

                if( fuzzer.random.bool(0.25) )
                {
                    var startindex = fuzzer.random.integer(0,array.length);
                    var deletelength = fuzzer.random.integer(1,array.length);
                    array.splice(startindex, deletelength);
                }

                if( fuzzer.random.bool(0.25) )
                {
                    var insertindex = fuzzer.random.integer(0,array.length);
                    var insertlength = fuzzer.random.integer(1,array.length);
                    var randomchars = fuzzer.random.string(insertlength).split('');
                    array.splice.apply(array, [startindex,0].concat(randomchars));
                }

            } while( fuzzer.random.bool(0.05) )
            return array.join('');
        }
    }
};

fuzzer.seed(0);
var markDown = fs.readFileSync('simple.md','utf-8');
let mutuatedString = fuzzer.mutate.string(markDown);