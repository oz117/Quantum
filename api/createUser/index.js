'use strict';

exports.createUser = function(req, res) {
	if (!req.body.userName) {
		return res.json({'code' : '4343', 'error' : 'user name required'});
	}
	if (!req.body.password) {
		return res.json({'code' : '4343', 'error' : 'password required'});
	}
	// Searches for duplicates
	req.app.db.models.User.findOne({userName: req.body.userName}, function(err, user) {
		if (err) {
			return res.json({'code' : '4444', 'exception' : 'search in db exception'});
		}
		if (user) {
			return res.json({'code' : '4343', 'error' : 'userName already exists'});
		}
		// Hashes the user password
		req.app.db.models.User.encryptPassword(req.body.password, function(err, hash) {
			if (err) {
				return res.json({'code' : '4444', 'exception' : 'password hash failed'});
			}
			var fieldToSet = {
				userName: req.body.userName,
				password: hash
			};
			// Adds the user to the database
			req.app.db.models.User.create(fieldToSet, function(err, user) {
				if (err) {
					return res.json({'code' : '4444', 'exception' : 'user creation failed'});
				}
				console.log('User created');
				return res.json({'code' : '4242', 'response' : 'user created'});
			});
		});
	});
};
