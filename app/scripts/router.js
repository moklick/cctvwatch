var MapView = require('./views/map.js'),
    HeaderView = require('./views/header.js'),
    LoginView = require('./views/login.js'),
    AboutView = require('./views/about.js'),
    AddCamView = require('./views/addcam.js'),
    CamInfoView = require('./views/caminfo.js'),
    views = {
        login : LoginView,
        about : AboutView,
        addcam : AddCamView,
        caminfo: CamInfoView
    };

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        '!/home': 'home',
        '!/:target': 'goto',
        '!/info/:id' : 'showInfo' 
    },
    initialize: function () {
        this.vent = _.extend({}, Backbone.Events);
        _.bindAll(this, 'showInfo');
        new HeaderView({
            el: $('.header'),
            vent: this.vent
        });

        this.mapView = new MapView({
            el: $('#map'),
            vent: this.vent
        });

        this.vent.on('goto', function (link) {
            this.navigate(link, {trigger: true});
        }.bind(this));

        this.vent.on('route:caminfo', function (link) {
            this.navigate(link, {trigger: true});
        }.bind(this));
    },
    home: function () {
        $('#details').empty();
    },
    goto: function(target){
        new views[target]({
            el: $('#details'),
            vent: this.vent
        });
    },
    showInfo: function(camId){

        var camModel = this.mapView.collection.where({id : camId});

        new views['caminfo']({
            el: $('#details'),
            vent: this.vent,
            camModel : camModel
        });
    }
});