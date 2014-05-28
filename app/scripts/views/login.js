var loginTemplate = require('../templates/login.html');

module.exports = Backbone.View.extend({
    template: _.template(loginTemplate),
    initialize:function(options){
    	this.vent = options.vent;
        this.render();
    },
    render:function(){
        this.$el.html(this.template());

        return this;
    }
});