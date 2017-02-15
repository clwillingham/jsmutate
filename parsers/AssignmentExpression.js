/**
 * Created by chris on 2/14/17.
 */

function randomOperator(){
    var operators = ['+', '-', '/', '*', '%', '<<', '>>', '&', '|'];
    return operators[Math.round(Math.random()*9)];
}

module.exports = {
    type: ['BinaryExpression', 'AssignmentExpression'],
    parse: function (statement, parse, level) {
        if(statement.operator != '='){
            statement.operator = randomOperator();
        }
        //if(!statement.right)
        statement.left = parse(statement.left, parse, level+1);
        statement.right = parse(statement.right, parse, level+1);
        if(Math.random() >= .75){ //25% chance of swapping operators
            var left = statement.left;
            statement.left = statement.right;
            statement.right = left;
        }
        return statement;
    }
};