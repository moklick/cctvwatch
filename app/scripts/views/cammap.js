window.$ = require('jquery');
window._ = require('lodash');
window.L = require('leaflet');
var Backbone = require('backbone');
var cctvModel = require('../models/cctvModel.js');

Backbone.$ = window.$;

module.exports = Backbone.View.extend({
    template: $('#mapViewTemplate').html(),
    className: 'global',
    events: {
        'click #addCam': 'addCamLink',
        'click #markBtn': 'markCam'
    },
    map: {},
    cam: new cctvModel,
    initialize: function() {
    },
    render: function() {

        var template = _.template(this.template);
        this.$el.html(template());
        $('body').html(this.el);

        this.initMap();

        return this;
    },

    initMap: function() {
        this.map = new L.Map('map', {
            center: [52.520, 13.385],
            zoom: 11
        });
        var tileLayer = new L.TileLayer('http://{s}.tiles.mapbox.com/v3/moklick.hh7gbc50/{z}/{x}/{y}.png', {
            attribution: '<a href="http://mapbox.com/about/maps" target="_blank">Mapbox</a> |  Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
        }).addTo(this.map);
    },

    addCamLink: function() {
        var self = this;
        navigator.geolocation.getCurrentPosition(function(location) {
            // TODO: show error if location cannot be detected
            self.showPosition(location.coords.latitude, location.coords.longitude);
        });
    },
    showPosition: function(lat, long) {
        L.Icon.Default.imagePath = 'images';
        var latlng = new L.LatLng(lat,long);
        this.cam.set({location: [lat,long]});
        this.map.setView(latlng, 18);
        this.showCamForm();
        this.updatePosition(latlng);
        var marker = new L.Marker(latlng, {draggable: true});
        marker.on('drag', _.bind(function(e) {
            this.updatePosition(marker._latlng);
        }, this));
        marker.addTo(this.map);
    },
    showCamForm: function() {
        $('#map').css('height', '70%');
        $('#addCamForm').show();
    },
    updatePosition: function(latlng) {
        var lat = latlng.lat, 
        lng = latlng.lng;
        this.cam.set({location: [lat,lng]});
        $('.position .lat').text(lat);
        $('.position .long').text(lng);
    },
    markCam: function() {
        this.cam.save();
    }
});
