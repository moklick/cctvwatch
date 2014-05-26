var CamMapView = require('./views/cammap.js'),
    HeaderView = require('./views/header.js');

module.exports = Backbone.Router.extend({
    routes: {
        '!/camMap': 'camMap',
        '!/addCam': 'addCam'
    },
    initialize:function(){
      this.headerView = new HeaderView({el:$('#header')});
      this.mapView = new CamMapView({el:$('#map')});
    },
    camMap: function () {
        var mapView = new CamMapView();
        mapView.render();
    },
    addCam: function () {
        console.log('addCam');
    },
    changePage: function (view) {
  //      view.render();
 //       $('body').html(this.headerView.el).append(view.el);
    }
});