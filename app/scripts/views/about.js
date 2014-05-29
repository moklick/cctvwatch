var aboutTemplate = require('../templates/about.html');

module.exports = Backbone.View.extend({
	events: {
        'click .close-btn': 'close'   
    },
    template: _.template(aboutTemplate),
    initialize:function(options){
    	this.vent = options.vent;
        this.render();
    },
    close: function(){
        this.$el.css({bottom : '-1000px'});
    	//this.$el.empty();
    },
    render:function(){
        this.$el.html(this.template());
        this.$el.css({bottom : 0});

        return this;
    }
});