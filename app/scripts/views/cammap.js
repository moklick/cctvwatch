var cctvCollection = require('../collections/cctvCollection.js'),
    cctvModel = require('../models/cctvModel.js'),
    cctvTemplate = require('../templates/map.html');

module.exports = Backbone.View.extend({
    template: _.template($(cctvTemplate).html()),
    map: {},
    collection: new cctvCollection(),
    cam: new cctvModel(),
    initialize: function() {
        this.render();
    },
    render: function() {

        this.$el.html(this.template());

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