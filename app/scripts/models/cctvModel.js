module.exports = Backbone.Model.extend({
    url: 'api/v1/cctv',
    defaults: {
        lat : 0,
        lng: 0,
        type: 'no type defined',
        comment: 'no comment',
        direction: 'no direction defined',
        owner: 'no owner defined'
    },
    initialize: function(){

    }

});