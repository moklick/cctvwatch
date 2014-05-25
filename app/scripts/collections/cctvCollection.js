var cctvModel = require('../models/cctvModel.js');

module.exports = Backbone.Collection.extend({
	url: '/cctv',
	model: cctvModel
});