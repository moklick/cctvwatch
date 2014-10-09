var cctvModel = require('../models/cctvModel.js');

module.exports = Backbone.Collection.extend({
	url: 'api/v1/cctv?limit=0',
	model: cctvModel
});