var loginTemplate = require('../templates/login.html');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
	events: {
        'click .menu-close': 'closeDetails'   
    },
    template: _.template(loginTemplate),
    initialize:function(options){
    	this.vent = options.vent;
        this.renderDetails();
    }
});