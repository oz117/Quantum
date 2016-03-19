/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:10:14 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/19 23:55:33 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

exports.createUser = function(req, res) {
	if (!req.body.userName) {
		return res.json({ 'code' : '4343', 'error' : 'user name required' });
	}
	if (!req.body.password) {
		return res.json({ 'code' : '4343', 'error' : 'password required' });
	}
	if (!req.body.regId) {
		return res.json({ 'code' : '4343', 'error' : 'regId required' });
	}
	// Searches for duplicates
	req.app.db.models.User.findOne({ userName: req.body.userName }, function(err, user) {
		if (err) {
			return res.json({ 'code' : '4444', 'exception' : 'search in db exception' });
		}
		if (user) {
			return res.json({ 'code' : '4343', 'error' : 'userName already exists' });
		}
	});
	var fieldToSet = {
		userName: req.body.userName,
		password: req.body.password,
		regId: req.body.regId,
		isActive: 'yes'
	};
	// Adds the user to the database
	req.app.db.models.User.create(fieldToSet, function(err, user) {
		if (err) {
			return res.json({ 'code' : '4444', 'exception' : 'user creation failed' });
		}
		return res.json({ 'code' : '4242', 'response' : 'user created', 'id' : user.id });
	});
};
