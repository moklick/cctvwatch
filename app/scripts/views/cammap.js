window.$ = require('jquery');
window._ = require('lodash');
window.L = require('leaflet');
var Backbone = require('backbone');
Backbone.$ = window.$;
//Backbone._ = _;

module.exports = Backbone.View.extend({
    template: $('#mapViewTemplate').html(),
    className:'global',
    events: {
        'click addCamLink': 'addCamLink'
    },
    map: {},
    render: function () {

        var template = _.template(this.template);
        this.$el.html(template());
        $('body').html(this.el);

        this.initMap();
        
        return this;
    },

    initMap : function(){
        this.map = new L.Map('map', {
            center: [52.520, 13.385],
            zoom: 11
        });
        var tileLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/moklick.hh7gbc50/{z}/{x}/{y}.png', {
            attribution: '<a href="http://mapbox.com/about/maps" target="_blank">Mapbox</a> |  Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
        }).addTo(this.map);
    }

});