var caminfoTemplate = require('../templates/caminfo.html');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
    events: {
        'click .close-btn': 'closeDetails',
        'click .edit-btn': 'editCam'
    },
    template: _.template(caminfoTemplate),
    initialize: function(options) {
        this.vent = options.vent;
        this.camModel = options.camModel[0];
        this.$details = $('#details');

        this.render();
    },
    render: function() {

        // TODO: we have to decide which attributes we want to display
        var html = '';
        _.forEach(this.camModel.attributes, function(el, i) {
            html += i + ':' + el + '<br />';
        });

        this.$details.empty();
        this.$details.html(this.template({
            data: html
        }));

        this.$details.css({
            bottom: 0
        });

        return this;
    },
    editCam: function() {
        console.log('edit cam');
    }
});
