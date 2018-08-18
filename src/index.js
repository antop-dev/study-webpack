import _ from 'lodash';
import $ from 'jquery';
import printMe from './print.js';
import './style.css';
import Icon from './images/icon.png';

import { cube } from './math.js';

let $body = $('body');

// div element
let $el = $('<div />', {
    html: _.join(['Hello', 'webpack'], ' '),
    class: 'hello'
});
$body.append($el);

// img
let $icon = $('<img />', {
    src: Icon
});
$body.append($icon);

// button
let $btn = $('<button />', {
    type: 'button',
    text: 'Click me and check the console!',
    click: printMe
});
$body.append($('<div />').append($btn));

// math cube
let $cube = $('<pre />', {
   text : ['Hello webpack!', '5 cubed is equal to ' + cube(5)].join('\n\n')
});

$body.append($cube);