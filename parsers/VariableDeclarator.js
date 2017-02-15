/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['VariableDeclarator'],
    parse: function(statement, parse, level){
        if(statement.init != null){
            statement.init = parse(statement.init, parse, level+1);
        }
        return statement;
    }
};