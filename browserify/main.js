'use strict';

var _ = require('underscore');

var square = function square(x) {
    return x * x;
}

var squares = _.map([1, 2, 3, 4, 5], square);

document.getElementById('response').innerHTML = squares;

// browserify main.js -o bundle.js

// browserify main.js --debug | exorcist bundle.map.js > bundle.js

// watchify main.js -o bundle.js -v

// beefy main.js:bundle.js --live




