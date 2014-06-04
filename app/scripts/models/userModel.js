module.exports = Backbone.Model.extend({
    defaults: {
        csrf : undefined,
        loggedIn: true
    },
    isLoggedIn: function(){
    	return this.get('loggedIn');
    },
    initialize: function(){

    }
});