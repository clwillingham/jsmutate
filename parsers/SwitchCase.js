/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['SwitchCase'],
    action: function (statement, parse, level) {
        if(statement.test)
            statement.test = parse(statement.test, parse, level+1);
        statement.consequent.forEach(function(subStatement, i){
            statement.consequent[i] = parse(subStatement, parse, level+1);
        });
        return statement;
    }
};