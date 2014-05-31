var aboutTemplate = require('../templates/about.html');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
	events: {
        'click .close-btn': 'closeDetails'   
    },
    template: _.template(aboutTemplate),
    initialize:function(options){
    	this.vent = options.vent;
    	this.render();
    }
});