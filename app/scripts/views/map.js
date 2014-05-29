var cctvCollection = require('../collections/cctvCollection.js'),
    cctvModel = require('../models/cctvModel.js'),
    cctvTemplate = require('../templates/map.html');

module.exports = Backbone.View.extend({
    template: _.template(cctvTemplate),
    map: {},
    collection: new cctvCollection(),
    cam: new cctvModel(),
    initialize: function(options) {
        this.render();
        _.bindAll(this, 'toggleOverlay', 'hideOverlay', 'showOverlay');  
        options.vent.bind('toggle:overlay', this.toggleOverlay);
        options.vent.bind('hide:overlay', this.hideOverlay);
        options.vent.bind('show:overlay', this.showOverlay);

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
            zoom: config.map.zoom,
            zoomControl : false
        });
        var tileLayer = new L.TileLayer(config.map.tilesURL, {
            attribution: config.map.label
        }).addTo(this.map);

        new OSMBuildings(this.map).loadData();

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
    },
    hideOverlay: function(){
        $('.map-overlay').removeClass('active');
    },
    showOverlay: function(){
        $('.map-overlay').hideClass('active');
    },
    toggleOverlay: function(){
        $('.map-overlay').toggleClass('active');
    }
});