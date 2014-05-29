var MapView = require('./views/map.js'),
    HeaderView = require('./views/header.js'),
    LoginView = require('./views/login.js'),
    AboutView = require('./views/about.js'),
    AddCamView = require('./views/addcam.js');

module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        '!/home': 'home',
        '!/addcam': 'addcam',
        '!/login': 'login',
        '!/about': 'about'
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
            this.navigate('!/' + data, {trigger: true});
        }.bind(this));
    },

    home: function () {
        $('#details').html('');
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
    },

    about: function () {
        new AboutView({
            el: $('#details'),
            vent: this.vent
        });
    }

});