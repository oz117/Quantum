/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   passport.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:08:36 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 17:31:05 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

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
				if (err) {
					return done(err);
				}
				if (!user){
					return done(null, false, { 'code' : '4343', 'error' : 'Unknow user'});
				}
				return done(null, user);
				// app.db.models.User.validatePassword(password, user.password, function(err, isValid) {
				// 	if (err) {
				// 		return done(err);
				// 	}
				// 	if (!isValid) {
				// 		return done(null, false, { 'code' : '4343', 'error' : 'Wrong password'});
				// 	}
				// 	return done(null, user);
				// });
			});
		}
	));
};
