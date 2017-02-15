/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['VariableDeclaration'],
    parse: function(statement, parse, level){
        statement.declarations.forEach(function(subStatement, i){
            statement.declarations[i] = parse(subStatement, parse, level+1);
        });
        return statement
    }
};