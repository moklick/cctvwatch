var loginTemplate = require('../templates/login.html');

module.exports = Backbone.View.extend({
	events: {
        'click .menu-cancel': 'closeLogin'   
    },
    template: _.template(loginTemplate),
    initialize:function(options){
    	this.vent = options.vent;
        this.render();
    },
    closeLogin: function(){
    	$('#details').hide();
    },
    render:function(){
        this.$el.html(this.template());

        return this;
    }
});