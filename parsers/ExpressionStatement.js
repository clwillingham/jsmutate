/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['ExpressionStatement'],
    parse: function(statement, parse, level){
        // console.log('EXPRESSION',statement.expression);
        statement.expression = parse(statement.expression, parse, level+1);
        return statement;
    }
}