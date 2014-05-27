var headerTemplate = require('../templates/header.html');

module.exports = Backbone.View.extend({
    template: _.template($(headerTemplate).html()),
    events: {
        'click #menuButton': 'menuButton'

    },
    initialize:function(){
        this.render();
        this.menuDropDown = this.$el.find('#menuDropDown');
    },
    menuButton: function () {
        /**
         * TODO: show or hide the menu
         */

        console.log('menu');

    },
    render:function(){
        
        this.$el.html(this.template({
            menuItems:'items'

        }));
    }




});