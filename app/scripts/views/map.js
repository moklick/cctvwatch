var cctvCollection = require('../collections/cctvCollection.js'),
    cctvModel = require('../models/cctvModel.js'),
    cctvTemplate = require('../templates/map.html');

L.Icon.Default.imagePath = 'images';

module.exports = Backbone.View.extend({
    template: _.template(cctvTemplate),
    collection: new cctvCollection(),
    cam: new cctvModel(),
    map: {},
    addCamMarker: {},
    initialize: function(options) {
        this.vent = options.vent;
        _.bindAll(this, 'toggleOverlay', 'hideOverlay', 'showOverlay', 'setView', 'createMarker','removeMarker');

        this.vent.on('toggle:overlay', this.toggleOverlay);
        this.vent.on('hide:overlay', this.hideOverlay);
        this.vent.on('show:overlay', this.showOverlay);
        this.vent.on('retrieveMapPosition', this.retrieveMapPosition);
        this.vent.on('map:setView', this.setView);
        this.vent.on('map:createMarker', this.createMarker);
        this.vent.on('map:removeMarker', this.removeMarker);

        this.render();
    },
    render: function() {

        this.$el.html(this.template());

        this.initMap();
        this.collection.fetch();
        this.drawCams();

        return this;
    },

    retrieveMapPosition: function() {
        // schick die aktuelle center position in die pipe! weeeeeeeeoooooooo!
        //this.vent.trigger('')
    },

    setView: function(params) {
        this.map.setView(params.latlng, params.zoom);
    },

    createMarker: function(params) {

        this.map.setView(params.latlng, config.map.detailZoom);

        this.addCamMarker = new L.Marker(params.latlng, {
            draggable: true
        });

        this.addCamMarker.on('drag', _.bind(function(e) {
            this.vent.trigger('addcam:updateMarker', {latlng : this.addCamMarker._latlng})
        }, this));

        this.addCamMarker.addTo(this.map);

    },
    removeMarker: function(){
        if(typeof this.addCamMarker !== 'undefined'){
            this.map.removeLayer(this.addCamMarker);
        }
    },
    initMap: function() {
        this.map = new L.Map('map', {
            center: config.map.center,
            zoom: config.map.initZoom,
            zoomControl: false
        });
        var tileLayer = new L.TileLayer(config.map.tilesURL, {
            attribution: config.map.label
        }).addTo(this.map);

        // new OSMBuildings(this.map).loadData();
    },

    drawCams: function() {
        this.collection.bind('add', _.bind(function(model) {

            var latlng = model.get('location');
            if (latlng[0] && latlng[1]) {
                L.circle(latlng, 15, {
                    fill: true,
                    stroke: false,
                    fillColor: 'rgb(231,76,60)',
                    fillOpacity: .5
                }).addTo(this.map);
            }
        }, this));
    },
    hideOverlay: function() {
        $('.map-overlay').removeClass('active');
    },
    showOverlay: function() {
        $('.map-overlay').addClass('active');
    },
    toggleOverlay: function() {
        $('.map-overlay').toggleClass('active');
    }
});
