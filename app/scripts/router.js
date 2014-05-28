var MapView = require('./views/map.js'),
    HeaderView = require('./views/header.js'),
    LoginView = require('./views/login.js');

module.exports = Backbone.Router.extend({
    routes: {
        '!/camMap': 'camMap',
        '!/addCam': 'addCam'
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
            this.navigate(data, {trigger: true});
        });
    },

    addCam: function () {
        console.log('addCam');
    },
    login: function () {
        new LoginView({el: $('#details'), vent: this.vent});

    }
});