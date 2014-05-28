var MapView = require('./views/map.js'),
    HeaderView = require('./views/header.js'),
    LoginView = require('./views/login.js'),
    AddCamView = require('./views/addcam.js');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        '!/home': 'home',
        '!/addcam': 'addcam',
        '!/login': 'login'
    },

    initialize: function () {
        this.vent = _.extend({}, Backbone.Events);
        new HeaderView({
            el: $('header'),
            vent: this.vent
        });
        new MapView({
            el: $('#map'),
            vent: this.vent
        });
        this.vent.on('goto', function (data) {
            console.log(data);
            this.navigate('!/' + data, {trigger: true});
        }.bind(this));
    },

    home: function () {

    },

    addcam: function () {
        new AddCamView({
            el: $('#details'),
            vent: this.vent
        });
    },

    login: function () {
        new LoginView({
            el: $('#details'),
            vent: this.vent
        });
    }

});