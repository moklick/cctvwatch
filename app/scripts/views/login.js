var loginTemplate = require('../templates/login.html');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
	events: {
        'click .menu-close': 'closeDetails',
        'click .auth-btn' : 'authRedirect'   
    },
    template: _.template(loginTemplate),
    initialize:function(options){
    	this.vent = options.vent;
    	_.bindAll(this, 'authRedirect');
        this.renderDetails();
    },
    authRedirect: function(evt){
    	var provider = $(evt.target).attr('data-provider');
    	location.href = location.origin + '/auth/' + provider;
    }
});