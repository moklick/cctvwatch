window.$ = require('jquery');
window._ = require('lodash');
var Backbone = require('backbone');
Backbone.$ = window.$;
//Backbone._ = _;

module.exports = Backbone.View.extend({
    template: $('#camMapViewTemplate').html(),
    events: {
        'click addCamLink': 'addCamLink'
    },
    render: function () {
        var tempScript = $('#camMapViewTemplate').html();
        var template = _.template(tempScript);
        this.$el.html(template());
        return this;
    }

});