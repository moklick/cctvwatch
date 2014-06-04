module.exports = Backbone.Model.extend({
    defaults: {
        csrf : undefined,
        loggedIn: false
    },
    isLoggedIn: function(){
    	return this.get('loggedIn');
    },
    initialize: function(){

    }
});