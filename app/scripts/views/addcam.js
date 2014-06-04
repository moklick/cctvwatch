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
        'click .close-addcam': 'cancelAddCam',
        'click .next-step': 'nextStep',
        'click .save-camera': 'saveCamera'
    },
    initialize: function(options) {
        this.vent = options.vent;
        this.user = options.user;
        _.bindAll(this, 'saveCamera', 'showMarker','cancelAddCam', 'handleGeoError','updateMarker','nextStep');
        // this.vent.on('addcam:updateMarker', this.updateMarker);
        this.listenTo(this.vent, 'addcam:updateMarker', this.updateMarker);
        
        if(this.user.get('loggedIn')){
            this.addCamLink();
            this.bindEvents();
            this.render();
        }else{
            this.showLoginReq();
        }
        
    },
    nextStep: function() {

        $('.step-one').fadeOut(function() {
            $('.step-two').fadeIn();
            this.markerPosition[0] -= 0.0005;
            this.vent.trigger('map:setView', { latlng : this.markerPosition, zoom : config.map.detailZoom })

        }.bind(this));
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
            
        if(this.user.get('loggedIn')){
            camera.set('_csrf',this.user.get('csrf'));
        }   

        camera.save();

        this.vent.trigger('map:setView', { latlng : this.markerPosition, zoom : config.map.initZoom })
        
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
        var latlng = [location.coords.latitude - 0.0005, location.coords.longitude];
        this.markerPosition = latlng;
        this.vent.trigger('map:createMarker', {
            latlng: latlng
        });
    },
    handleGeoError: function(){
        // if the user does allow geolocation
        this.vent.trigger('map:createMarker', {
            latlng: -1
        }); 
    },
    addCamLink: function() {
        navigator.geolocation.getCurrentPosition(this.showMarker, this.handleGeoError, this.geoOptions);
    },
    cancelAddCam: function(evt) {
        evt.preventDefault();
        this.vent.trigger('map:setView', { latlng : this.markerPosition, zoom : config.map.initZoom })
        this.markerPosition = [];
        this.closeDetails();
    },
    updateMarker: function(params) {
        this.markerPosition = params.latlng;
    }
});
