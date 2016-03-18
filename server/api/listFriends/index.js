/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:10:17 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 12:10:18 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

exports.listFriends = function(req, res) {
	if (!req.body.key) {
		return res.json({ 'code' : '4343', 'error' : 'key required' });
	}
	req.app.db.models.User.findById({ _id: req.body.key }, function(err, user) {
		if (err) {
			return res.json({ 'code' : '4444', 'exception' : err });
		}
		if (!user) {
			return res.json({ 'code' : '4343', 'error' : 'unknow user' });
		}
		return res.json({ 'code' : '4242', 'friends' : user.friends });
	});
};
