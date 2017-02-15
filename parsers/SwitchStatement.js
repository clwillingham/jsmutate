/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['SwitchStatement'],
    parse: function (statement, parse, level) {
        parse(statement.discriminant, level+1);
        statement.cases.forEach(function(caseStatement, i){
            statement.discriminant[i] = parse(caseStatement, parse, level+1);
        });
        return statement;
    }
};