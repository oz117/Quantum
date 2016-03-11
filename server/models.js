'use strict';

exports = module.exports = function(app, mongoose) {
	require('./models/User.model')(app, mongoose);
};
