var loginTemplate = require('../templates/login.html');

module.exports = Backbone.View.extend({
    template: _.template(loginTemplate),
    initialize:function(){
        this.render();
    },
    render:function(){
        console.log('login render');
        this.$el.html(this.template());
        return this;
    }

});