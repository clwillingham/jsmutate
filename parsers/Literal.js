/**
 * Created by chris on 2/14/17.
 */
module.exports = {
    type: ['Literal'],
    parse: function (statement, parse, level) {
        if(typeof statement.value == 'number'){
            if(Math.random() > 0.5) {
                statement.value = statement.value + ((Math.random() - 0.5) * 10);
                if(statement.value < 0) statement.value = 0;
                statement.raw = undefined;
            }
        }
        return statement;
    }
};