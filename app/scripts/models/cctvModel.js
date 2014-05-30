module.exports = Backbone.Model.extend({
    url: '/cctv',
    defaults: {
        location : [],
        type: 'no type defined',
        comment: 'no comment',
        direction: 'no direction defined',
        owner: 'no owner defined'
    },
    initialize: function(){

    }

});