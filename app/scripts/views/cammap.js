var cctvModel = require('../models/cctvModel.js'),
    cctvTemplate = require('../templates/camMap.html');

module.exports = Backbone.View.extend({
    template: $(cctvTemplate).html(),
    className: 'global',
    events: {
        'click #addCam': 'addCamLink',
        'click #markBtn': 'markCam'
    },
    map: {},
    cam: new cctvModel,
    apiUrl: '/cctv',
    initialize: function() {},
    render: function() {

        var template = _.template(this.template);
        this.$el.html(template());
        $('body').html(this.el);

        this.initMap();
        this.getCams();

        return this;
    },

    initMap: function() {
        this.map = new L.Map('map', {
            center: [52.520, 13.385],
            zoom: 11
        });
        var tileLayer = new L.TileLayer(config.map.tilesURL, {
            attribution: config.map.label
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
        var latlng = new L.LatLng(lat, long);
        this.cam.set({
            location: [lat, long]
        });
        this.map.setView(latlng, 18);
        this.showCamForm();
        this.updatePosition(latlng);
        var marker = new L.Marker(latlng, {
            draggable: true
        });
        marker.on('drag', _.bind(function(e) {
            this.updatePosition(marker._latlng);
        }, this));

        marker.addTo(this.map);
    },
    showCamForm: function() {
        $('#addCamForm').show();
    },
    updatePosition: function(latlng) {
        var lat = latlng.lat,
            lng = latlng.lng;
        this.cam.set({
            location: [lat, lng]
        });
        $('.position .lat').text(lat);
        $('.position .long').text(lng);
    },
    markCam: function() {
        this.cam.set({
            type: $('.camtype [type=radio]:checked').val(),
            direction: $('.direction [type=radio]:checked').val()
        });
        console.log(this.cam);
        this.cam.save();
    },
    getCams: function() {
        $.ajax({
            url: this.apiUrl,
            dataType: 'json'
        }).done(function(data) {
            this.addcams(data);
        }.bind(this));
    },
    addcams: function(cctvs) {
        cctvs.forEach(function(point, i) {
            if (point.location[0] && point.location[1]) {
                L.circle(point.location, 15, {
                    fillColor: '#e74c3c',
                    fillOpacity: 1,
                    stroke: false
                }).addTo(this.map);
            }

        }.bind(this));
    }
});