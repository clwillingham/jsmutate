/**
 * Created by chris on 11/21/15.
 */
var esprima = require('esprima'),
    escodegen = require('escodegen'),
    fs = require('fs');

function randomOperator(){
    var operators = ['+', '-', '/', '*', '%', '<<', '>>', '&', '|'];
    return operators[Math.round(Math.random()*9)];
}

function parse(statement, level){
    if(!statement.type){
        return statement;
    }
    if(!level){
        level = 0
    }
    //console.log(statement.type, level);
    switch(statement.type){
        case 'Program':
        case 'BlockStatement':
            if(statement.body != null){
                statement.body.forEach(function(subStatement, i){
                    console.log('parsing %d', i);
                    statement.body[i] = parse(subStatement, level+1);
                })
            }
            break;
        case 'VariableDeclaration':
            statement.declarations.forEach(function(subStatement, i){
                statement.declarations[i] = parse(subStatement, level+1);
            });
            break;
        case 'VariableDeclarator':
            if(statement.init != null){
                statement.init = parse(statement.init, level+1);
            }
            break;
        case 'ExpressionStatement':
            console.log('EXPRESSION',statement.expression);
            statement.expression = parse(statement.expression, level+1);
            break;
        case 'BinaryExpression':
        case 'AssignmentExpression':
            if(statement.operator != '='){
                statement.operator = randomOperator();
            }
            //if(!statement.right)
            statement.left = parse(statement.left, level+1);
            statement.right = parse(statement.right, level+1);
            if(Math.random() >= .75){ //25% chance of swapping operators
                var left = statement.left;
                var right = statement.right;
                statement.left = right;
                statement.right = left;
            }
            break;
        case 'Literal':
            //console.log(typeof statement.value);
            if(typeof statement.value == 'number'){
                if(Math.random() > 0.5) {
                    statement.value = statement.value + ((Math.random() - 0.5) * 10);
                    if(statement.value < 0) statement.value = 0;
                    statement.raw = undefined;
                }
            }
            break;
        case 'FunctionDeclaration':
            statement = parse(statement.body, level+1);
            break;
        case 'CallExpression':
            console.log(statement.arguments);
            statement.arguments.forEach(function(subStatement, i){
                statement.arguments[i] = parse(subStatement, level+1);
            });
            break;
        case 'SwitchStatement':
            parse(statement.discriminant, level+1);
            statement.cases.forEach(function(caseStatement, i){
                statement.discriminant[i] = parse(caseStatement, level+1);
            });
            break;
        case 'SwitchCase':
            if(statement.test)
                statement.test = parse(statement.test, level+1);
            statement.consequent.forEach(function(subStatement, i){
                statement.consequent[i] = parse(subStatement, level+1);
            });
            break;
        default:
            console.log('UNKNOWN STATEMENT: ', statement);
            for(var key in statement) {
                if(statement[key] != null && statement[key].type != null) {
                    statement[key] = parse(statement[key], level+1);
                }
            }
    }
    return statement;
}

module.exports.mutateSync = function(code){
    var jst = esprima.parse(code);
    console.log(parse(jst));
    return escodegen.generate(parse(jst));
};
//console.log(jst);

//console.log(escodegen.generate(mutatedResult));
//console.log(JSON.stringify(mutatedResult, null, 2));