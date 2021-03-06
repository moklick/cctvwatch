var aboutTemplate = require('html!../templates/about.html');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
	events: {
        'click .close-about': 'closeDetails'   
    },
    template: _.template(aboutTemplate),
    initialize:function(options){
    	this.vent = options.vent;
    	this.render();
    }
});