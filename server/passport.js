'use strict';

// Creation of a strategy to authenticate a user
exports = module.exports = function(app, passport) {
	var LocalStrategy = require('passport-local').Strategy;

	passport.use(new LocalStrategy({
		usernameField: 'userName',
		passwordField: 'password'
		},
		function(username, password, done) {
			var conditions = { userName: username };
			app.db.models.User.findOne(conditions, function(err, user) {
				console.log("Hola!");
				if (err) {
					return done(err);
				}
				if (!user){
					return done(null, false, { 'code' : '4343', 'error' : 'Unknow user'});
				}
				app.db.models.User.validatePassword(password, user.password, function(err, isValid) {
					if (err) {
						return done(err);
					}
					if (!isValid) {
						return done(null, false, { 'code' : '4343', 'error' : 'Wrong password'});
					}
					return done(null, user);
				});
			});
		}
	));
};
