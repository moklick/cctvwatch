var cctvCollection = require('../collections/cctvCollection.js'),
    cctvModel = require('../models/cctvModel.js'),
    cctvTemplate = require('../templates/map.html');

module.exports = Backbone.View.extend({
    template: _.template(cctvTemplate),
    map: {},
    collection: new cctvCollection(),
    cam: new cctvModel(),
    initialize: function(options) {
        this.vent = options.vent;
        this.render();
        _.bindAll(this, 'toggleOverlay', 'hideOverlay', 'showOverlay');
        this.vent.on('toggle:overlay', this.toggleOverlay);
        this.vent.on('hide:overlay', this.hideOverlay);
        this.vent.on('show:overlay', this.showOverlay);
        this.vent.on('retrieveMapPosition', this.retrieveMapPosition)


    },
    render: function() {

        this.$el.html(this.template());

        this.initMap();
        this.collection.fetch();
        this.addCams();

        return this;
    },

    retrieveMapPosition:function(){
        // schick die aktuelle center position in die pipe! weeeeeeeeoooooooo!


        //this.vent.trigger('')


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
        $('.map-overlay').addClass('active');
    },
    toggleOverlay: function(){
        $('.map-overlay').toggleClass('active');
    }
});