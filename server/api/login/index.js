/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:10:22 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/20 00:11:23 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

// Logs a user and updates it s regId
exports.login = function(req, res) {
	if (!req.body.userName) {
		return res.json({ 'code' : '4343', 'error' : 'user name required' });
	}
	if (!req.body.password) {
		return res.json({ 'code' : '4343', 'error' : 'password required' });
	}
	if (!req.body.regId) {
		return res.json({ 'code' : '4343', 'error' : 'regId required' });
	}
	req.app.db.models.User.findOne({ userName: req.body.userName }, function(err, user) {
		if (err) {
			return res.json({ 'code' : '4444', 'exception' : err });
		}
		if (!user) {
			return res.json({ 'code' : 4343, 'error' : 'unknow user' });
		}
		if (user.password !== req.body.password) {
			return res.json({ 'code' : 4343, 'error' : 'wrong password' });
		}
		var fieldToUpdate = { regId : req.body.regId, isActive: 'yes' };
		req.app.db.models.User.findByIdAndUpdate(user.id, fieldToUpdate,
			function(err, user){
				if (err) {
					return res.json({ 'code' : '4444', 'exception' : err });
				}
				if (!user) {
					return res.json({ 'code' : '4343', 'error' : 'Could not set regId' });
				}
				return res.json({ 'code' : '4242', 'response' : 'User logged in and regId set', 'id' : user.id });
		});
	});
};
