var headerTemplate = require('../templates/header.html');

module.exports = Backbone.View.extend({
    template: _.template(headerTemplate),
    events: {
        'click #menuButton': 'menuButton',
        'click #menuItem1': 'addCamLink',
        'click #menuItem2': 'loginLink',
        'click #menuItem3': 'aboutLink'

    },
    addCamLink: function(){
        router.navigate('!/addcam')
    },
    loginLink: function(){
        router.navigate('!/login')

    },
    aboutLink: function(){
        router.navigate('!/about')

    },
    initialize: function () {
        this.render();
        this.menuDropDown = this.$el.find('#menuDropDown');
    },
    menuButton: function () {
        /**
         * TODO: show or hide the menu
         */

        console.log('menu');

    },
    render: function () {
        this.$el.html(this.template());
    }




});