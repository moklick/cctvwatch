var MapView = require('./views/map.js'),
    HeaderView = require('./views/header.js'),
    LoginView = require('./views/login.js'),
    AboutView = require('./views/about.js'),
    AddCamView = require('./views/addcam.js'),
    targets = {
        login : LoginView,
        about : AboutView,
        addcam : AddCamView
    };

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        '!/home': 'home',
        '!/:target': 'goto'
    },
    initialize: function () {
        this.vent = _.extend({}, Backbone.Events);
        new HeaderView({
            el: $('.header'),
            vent: this.vent
        });
        new MapView({
            el: $('#map'),
            vent: this.vent
        });
        this.vent.on('goto', function (data) {
            this.navigate(data, {trigger: true});
        }.bind(this));
    },
    home: function () {
        $('#details').empty();
    },
    goto: function(target){
        new targets[target]({
            el: $('#details'),
            vent: this.vent
        });
    }
});