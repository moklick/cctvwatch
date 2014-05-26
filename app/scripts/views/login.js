var loginTemplate = require('../templates/login.html');

module.export = Backbone.View.extend({
    template: _.template($(loginTemplate).html()),
    initialize:function(){
        this.render();
    },
    render:function(){
        this.$el.html(this.template());
        return this;
    }

});