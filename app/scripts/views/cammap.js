var cctvCollection = require('../collections/cctvCollection.js'),
    cctvModel = require('../models/cctvModel.js')
    cctvTemplate = require('../templates/cctvMap.html');

module.exports = Backbone.View.extend({
    template: $(cctvTemplate).html(),
    className: 'global',
    events: {
        'click #addCam': 'addCamLink',
        'click #markBtn': 'markCam'
    },
    map: {},
    collection: new cctvCollection(),
    cam: new cctvModel(),
    initialize: function() {},
    render: function() {

        var template = _.template(this.template);
        this.$el.html(template());
        $('body').html(this.el);

        this.initMap();
        this.collection.fetch();
        this.addCams();

        return this;
    },

    initMap: function() {
        this.map = new L.Map('map', {
            center: config.map.center,
            zoom: config.map.zoom
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
        L.Icon.Default.imagePath = config.imagePath;
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
        // TODO: Use templating instead of jQuery manipulations
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

        this.collection.create(this.cam);
    },
    addCams: function() {
        this.collection.bind('add', _.bind(function(model) {

            var point = model.get('location');
            if (point[0] && point[1]) {
                L.circle(point, 15, {
                    fillColor: '#e74c3c',
                    fillOpacity: 1,
                    stroke: false
                }).addTo(this.map);
            }

        }, this));
    }
});