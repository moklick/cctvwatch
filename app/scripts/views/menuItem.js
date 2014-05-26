var itemTemplate = require('../templates/menuItem.html');

module.export = Backbone.View.extend({
    template: _.template($(itemTemplate).html()),
    initialize:function(){
        this.render();
    },
    render:function(){
        this.$el.html(this.template());
        return this;
    }

});