var loginTemplate = require('../templates/login.html');

module.exports = Backbone.View.extend({
	events: {
        'click .menu-close': 'closeLogin'   
    },
    template: _.template(loginTemplate),
    initialize:function(options){
    	this.vent = options.vent;
        this.render();
    },
    closeLogin: function(){
    	this.$el.empty();
    },
    render:function(){
        this.$el.html(this.template());

        return this;
    }
});