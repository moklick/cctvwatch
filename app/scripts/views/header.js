var headerTemplate = require('../templates/header.html');

module.exports = Backbone.View.extend({
    template: _.template(headerTemplate),
    events: {
        'click .menu-button': 'menuButton',
        'click .menu-item': 'goto'
    },
    initialize: function (options) {
        this.vent = options.vent;
        _.bindAll(this, 'goto');
        this.render();
    },
    menuButton: function () {
        $('.menu-items').toggleClass('active');
        this.vent.trigger('toggle:overlay');
    },
    render: function () {
        this.$el.html(this.template());
    },
    goto: function(evt){
        var link = $(evt.target).attr('data-link');
        this.vent.trigger('goto:' + link);

        console.log('goto:' + link);
    }
});