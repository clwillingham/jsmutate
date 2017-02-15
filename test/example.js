/**
 * Created by chris on 2/14/17.
 */
var fs = require('fs');
var jsmutate = require('../index');


var code = fs.readFileSync('./sample.js', 'utf8');
var moddedCode = code;// = jsmutate.mutateSync(code);
console.log(code);
for(var i=0;i < 5; i++){
    moddedCode = jsmutate.mutateSync(moddedCode);
    console.log('screwed up version: ');
    console.log(moddedCode);
}