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
    	this.$el.css({bottom : '-1000px'});
    },
    render:function(){
        this.$el.html(this.template());
        this.$el.css({bottom : 0});

        return this;
    }
});