window.$ = require('jquery');
window._ = require('lodash');
window.L = require('leaflet');
var Backbone = require('backbone');

Backbone.$ = window.$;

module.exports = Backbone.Model.extend({
	urlRoot: 'http://localhost:1337/cctv',
    defaults: {
        location : [],
        owner: 'no owner defined'
    },
    initialize: function(){
    	console.log('model initialized');
    }

});