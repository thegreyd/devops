var Random  = require('random-js');
var fs      = require('fs');
var walk    = require('walk');
var javaparser = require('./javaparser');

function selectSourceFiles() {
    var files = [];
    options = {
        listeners: {
            file: function (root, stat, next) {
                if (stat.name.substring(stat.name.length - 5) === '.java'){
                    files.push(root + '/' + stat.name);
                }
                next();
            }
        },
        followLinks: false
    };
    var walker  = walk.walkSync('./iTrust', options);
    return files;
}

var fuzzer = {
    random : new Random(Random.engines.mt19937().seed(0)),
    
    seed: function (kernel) {
        fuzzer.random = new Random(Random.engines.mt19937().seed(kernel));
    },

    mutate: {
        string: function(parsed_java, java) {
            // MUTATE IMPLEMENTATION HERE
            java = java.split('');
            
            // replace all < with >
            traverse(parsed_java, function (node) {
                if (node.operator && node.operator.includes('<')) {
                    for(var c=node.leftOperand.location[1];c<node.rightOperand.location[0];c++) {
                        if (java[c] == '<') {
                            java[c] = '>';
                        }    
                    }
                }    
            });

            // replace all 0 with 1
            traverse(parsed_java, function (node) {
                if (node.node === 'NumberLiteral' && node.token.includes("0")) {
                    for(var c=node.location[0];c<node.location[1];c++) {
                        if (java[c] == '0') {
                            java[c] = '1';
                        }    
                    }
                }    
            });
            
            // replace all == with !=
            traverse(parsed_java, function (node) {
                if (node.operator === '==') {
                    for(var c=node.leftOperand.location[1];c<node.rightOperand.location[0];c++) {
                        if (java[c] == '=' && java[c+1] == "=") {
                            java[c] = '!';
                            java[c+1] = '=';
                            break;
                        }    
                    }
                }    
            });            
            
            // replace all strings with zzzzz
            traverse(parsed_java, function (node) {
                if (node.node === 'StringLiteral') {
                    for(var c=node.location[0]+1;c<node.location[1]-1;c++) {
                        java[c] = 'z';    
                    }
                }    
            });

            return java.join('');
        }
    }
};

function getRandom(arr, count) {
    var tmp = arr.slice(arr);
    var ret = [];
    for (var i = 0; i < count; i++) {
        var index = Math.floor(Math.random() * tmp.length);
        var removed = tmp.splice(index, 1);
        ret.push(removed[0]);
    }
    return ret;
}

function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

fuzzer.seed(0);
var sourceFiles = selectSourceFiles();
var numberFiles = 5;
var java = '';
sourceFiles = getRandom(sourceFiles, numberFiles);

for (var c=0;c<sourceFiles.length;c++){
    java = fs.readFileSync(sourceFiles[c],'utf-8');
    parsed_java = javaparser.parse(java);
    console.log("mutating ",sourceFiles[c]);
    var mutated_java=fuzzer.mutate.string(parsed_java, java);
    fs.writeFileSync(sourceFiles[c], mutated_java, 'utf8');
}
