/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['CallExpression'],
    parse: function (statement, parse, level) {
        console.log(statement.arguments);
        statement.arguments.forEach(function(subStatement, i){
            statement.arguments[i] = parse(subStatement, parse, level+1);
        });
        return statement;
    }
};