var headerTemplate = require('../templates/header.html');

module.exports = Backbone.View.extend({
    template: _.template(headerTemplate),
    events: {
        'click .menu-toggle': 'menuButton',
        'click .menu-item': 'goto'
    },
    initialize: function (options) {
        this.vent = options.vent;
        this.$menuItems = $('.menu-items');
        _.bindAll(this, 'goto');
        this.render();

    },
    menuButton: function () {
        this.toggleMenu();
//        this.vent.trigger('toggle:overlay');
    },
    render: function () {
        this.$el.html(this.template());
    },
    goto: function (evt) {
        var link = $(evt.target).attr('data-link');
        this.vent.trigger('goto', link);
        this.toggleMenu();
    },
    toggleMenu: function () {
        console.log(this.$menuItems.size());

        $('.menu-items').toggleClass('active');
        $('.menu-items').hasClass('active') ? this.vent.trigger('show:overlay') : this.vent.trigger('hide:overlay');
    }
});