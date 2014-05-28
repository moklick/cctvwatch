var addcamTemplate = require('../templates/addcam1.html');

module.exports = Backbone.View.extend({
    template: _.template(addcamTemplate),
    events: {
        'click #ready': 'clickReady'

    },
    clickReady: function () {

        console.log('ready');
    },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }

});