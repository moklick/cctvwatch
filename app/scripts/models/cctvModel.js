module.exports = Backbone.Model.extend({
    url: '/cctv',
    defaults: {
        location : [],
        type: 'no type defined',
        direction: 'no direction defined',
        owner: 'no owner defined'
    },
    initialize: function(){
    	console.log('model initialized');
    }

});