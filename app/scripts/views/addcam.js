var addcamTemplate = require('../templates/addcam.html');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
    template: _.template(addcamTemplate),
    events: {
        'click #ready': 'clickReady'
    },
    clickReady: function () {
        this.vent.trigger('retrieveMapPosition');
    },
    initialize: function (options) {
        this.vent = options.vent;
        this.vent.on('giveMapPosition',function(data){});
        this.renderDetails();
    }
});