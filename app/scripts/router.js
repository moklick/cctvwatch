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
        console.log('camMap');
        this.changePage(new CamMapView());
    },
    addCam: function () {
        console.log('addCam');
    },
    changePage: function (view) {
        view.render();
        $('body').html(view.el);
    }

});