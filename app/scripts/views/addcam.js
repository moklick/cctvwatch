var addcamTemplate = require('../templates/addcam1.html');

module.exports = Backbone.View.extend({
    template: _.template(addcamTemplate),
    events: {
        'click #ready': 'clickReady'

    },
    clickReady: function () {
        this.vent.trigger('retrieveMapPosition');
    },
    initialize: function (options) {
        this.render();
        this.vent = options.vent;
        this.vent.on('giveMapPosition',function(data){});
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }

});