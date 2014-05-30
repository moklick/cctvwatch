var addcamTemplate = require('../templates/addcam.html');
var CctvModel = require('../models/cctvModel.js');
var BaseView = require('./base.js');

module.exports = BaseView.extend({
    template: _.template(addcamTemplate),
    geoOptions : {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    },
    markerPosition: [],
    events: {
        'click .close-btn': 'cancelAddCam',
        'click .next-step': 'nextStep',
        'click .save-camera': 'saveCamera'
    },
    initialize: function(options) {
        this.vent = options.vent;
        _.bindAll(this, 'saveCamera', 'showMarker', 'handleGeoError','updateMarker');
        this.vent.on('addcam:updateMarker', this.updateMarker);
        this.addCamLink();
        this.bindEvents();
        this.renderDetails();
    },
    nextStep: function() {
        $('.step-one').fadeOut(function() {
            $('.step-two').fadeIn();
        });
    },
    saveCamera: function(evt) {
        evt.preventDefault();

        var $form = $('.step form'),
            type = $form.find('input[type=\'radio\']:checked').val(),
            comment = $form.find('.comment').val(),
            camera = new CctvModel({
                location: this.markerPosition,
                type: type,
                comment : comment
            });

        camera.save();

        this.trigger('map:setView', { latlng : this.markerPosition, zoom : config.map.initZoom })
        this.showSuccessMsg();
        this.markerPosition = [];
        this.closeDetails();
    },
    showSuccessMsg: function(){
        $('.success-msg').fadeIn(300).delay(3250).fadeOut(300);
    },
    bindEvents: function() {
        $(document).on('submit', '.step form', this.saveCamera);
    },
    showMarker: function(location) {
        var latlng = [location.coords.latitude, location.coords.longitude];
        this.markerPosition = latlng;
        this.vent.trigger('map:createMarker', {
            latlng: latlng
        });
    },
    handleGeoError: function(){
        // TODO: handle geolocation error
        console.error('Geolocation error.');  
    },
    addCamLink: function() {
        navigator.geolocation.getCurrentPosition(this.showMarker, this.handleGeoError, this.geoOptions);
    },
    cancelAddCam: function(evt) {
        evt.preventDefault();
        this.markerPosition = [];
        this.closeDetails();
    },
    updateMarker: function(params) {
        this.markerPosition = params.latlng;
    }
});
