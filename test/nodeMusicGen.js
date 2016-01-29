/**
 * Created by chris on 1/29/16.
 */
var Pico = require('node-pico');
var t = 0;

function f1(t) {
    var out;
    out = t*(((t << 16.032248732168227 | t >> 5.136218722444028 | t >> 16) & 66.66214032983407));
    return out;
}


function oneliner() {
    var t = 0, dt = 8000 / Pico.sampleRate;

    return function(e) {
        var out = e.buffers;

        for (var i = 0; i < e.bufferSize; i++) {
            var x = (f1(t|0) % 256) / 512;
            out[0][i] = x;
            out[1][i] = x;
            t += dt;
        }
    };
}
Pico.play(oneliner());

var JSMutate = require('../');
console.log(JSMutate.mutateSync('(66.66214032983407 >> (t - 18.53548697102815 >> t / 5.136218722444028)) / (t - 4)'));