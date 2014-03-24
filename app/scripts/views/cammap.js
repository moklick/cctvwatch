window.$ = require('jquery');
window._ = require('lodash');
window.L = require('leaflet');
var Backbone = require('backbone');
Backbone.$ = window.$;
//Backbone._ = _;

module.exports = Backbone.View.extend({
    template: $('#camMapViewTemplate').html(),
    className:'global',
    events: {
        'click addCamLink': 'addCamLink'
    },
    render: function () {
        var tempScript = $('#camMapViewTemplate').html();
        var template = _.template(tempScript);
        this.$el.html(template());
        console.log(L);
        console.log(_);
        window.map = new L.Map($('#map',this.el)[0], {
        center: new L.LatLng(52.520, 13.385),
        zoom: 11
            });
            var tileLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/moklick.hh7gbc50/{z}/{x}/{y}.png', {
        attribution: '<a href="http://mapbox.com/about/maps" target="_blank">Mapbox</a> |  Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
    }).addTo(map);
        return this;
    }

});