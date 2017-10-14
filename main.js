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

                if( 1/*fuzzer.random.bool(0.05)*/ )
                {
                    val.replace("==", "!=")
                }

                /*if( fuzzer.random.bool(0.25) )
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
                }*/

            } while(1)/*( fuzzer.random.bool(0.05) )*/
	    return val
            //return array.join('');
        }
    }
};

fuzzer.seed(0);
var markDown = fs.readFileSync('LocalDateConverter.java','utf-8');
let mutuatedString = fuzzer.mutate.string(markDown);

var txtFile = new File('./test.java');
txtFile.open("w");
txtFile.writeln(mutatedString);
txtFile.close()

exports.fuzzer = fuzzer;

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

