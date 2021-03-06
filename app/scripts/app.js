window.$ = require('jquery');
window._ = require('lodash');
window.L = require('leaflet');
window.Backbone = require('backbone');
Backbone.$ = window.$;

window.config = require('../config');

'use strict';

function App() {}

module.exports = App;

App.prototype.start = function () {
    Backbone.history.start();
    var Router = require('./router.js');

    var router = new Router();
    router.navigate('', {
        trigger: true
    });
};

App.prototype.beep = function () {
    console.log('boop');
};