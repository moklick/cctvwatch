window.$ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = window.$;

'use strict';

function App() {
    console.log('app initialized');
}

module.exports = App;

App.prototype.start = function () {
    Backbone.history.start();
    var Router = require('./router.js');
    var router = new Router();
    router.navigate('camMap', {
        trigger: true
    });


}

App.prototype.beep = function () {
    console.log('boop');
};