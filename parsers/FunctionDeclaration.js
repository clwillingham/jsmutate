/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['FunctionDeclaration'],
    parse: function (statement, parse, level) {
        statement = parse(statement.body, parse, level+1);
        return statement;
    }
};