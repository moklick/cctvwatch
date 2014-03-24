window.$ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = window.$;
CamMapView = require('./views/cammap.js');

module.exports = Backbone.Router.extend({
    routes: {
        'camMap': 'camMap',
        'addCam': 'addCam'
    },
    camMap: function () {
        var mapView = new CamMapView();
        mapView.render();
    },
    addCam: function () {
        console.log('addCam');
    },
    changePage: function (view) {
        view.render();
        $('body').html(view.el);
    }

});