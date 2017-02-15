/**
 * Created by chris on 11/21/15.
 */
var esprima = require('esprima'),
    escodegen = require('escodegen'),
    path = require('path'),
    fs = require('fs');


var parsers = [];
function setupParsers(){
    var parserFiles = fs.readdirSync(path.join(__dirname, './parsers'));
    for(var i=0; i < parserFiles.length; i++){
        var parserFile = path.join(__dirname, './parsers', parserFiles[i]);
        parsers.push(require(parserFile));
    }
}


function randomOperator(){
    var operators = ['+', '-', '/', '*', '%', '<<', '>>', '&', '|'];
    return operators[Math.round(Math.random()*9)];
}

function parse(statement, parse, level){
    if(!statement.type){
        return statement;
    }
    if(!level){
        level = 0
    }
    for(var i=0; i < parsers.length; i++){
        var parser = parsers[i];
        if(parser.type.indexOf(statement.type) != -1){
            return parser.parse(statement, parse, level);
        }
    }
    console.log('UNKNOWN STATEMENT: ', statement);
    for(var key in statement) {
        if(statement[key] != null && statement[key].type != null) {
            statement[key] = parse(statement[key], level+1);
        }
    }
    return statement;
}

module.exports.mutateSync = function(code){
    var jst = esprima.parse(code);
    return escodegen.generate(parse(jst, parse));
};
setupParsers();
//console.log(jst);

//console.log(escodegen.generate(mutatedResult));
//console.log(JSON.stringify(mutatedResult, null, 2));