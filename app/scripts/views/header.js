var headerTemplate = require('html!../templates/header.html');

module.exports = Backbone.View.extend({
    template: _.template(headerTemplate),
    events: {
        'click .menu-toggle': 'menuButton',
        'click .menu-item': 'goto'
    },
    initialize: function (options) {
        this.vent = options.vent;
        _.bindAll(this, 'goto');
        this.render();
    },
    menuButton: function () {
        this.toggleMenu();
    },
    render: function () {
        this.$el.html(this.template());
    },
    goto: function (evt) {
        var link = $(evt.target).attr('data-link');

        if(link === 'logout'){
            location.href = config.logoutUrl;
            return false;
        }

        this.vent.trigger('goto', '!/' + link);
        this.toggleMenu();
    },
    toggleMenu: function () {
        $('.menu-items').toggleClass('active');
        $('.menu-items').hasClass('active') ? this.vent.trigger('show:overlay') : this.vent.trigger('hide:overlay');
    }
});