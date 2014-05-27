var addcamTemplate = require('../templates/addcam1.html');

module.export = Backbone.View.extend({
    template: _.template($(addcamTemplate).html()),
    events: {
        'click #ready': 'clickReady'

    },
    clickReady: function () {


    },
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }

});