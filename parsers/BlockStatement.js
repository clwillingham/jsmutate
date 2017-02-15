/**
 * Created by chris on 2/14/17.
 */

module.exports = {
    type: ['Program', 'BlockStatement'],
    parse: function(statement, parse, level){
        if(statement.body != null){
            statement.body.forEach(function(subStatement, i){
                // console.log('parsing %d', i);
                //TODO: order swapping maybe?
                statement.body[i] = parse(subStatement, parse, level+1);
            })
        }
        return statement;
    }
};