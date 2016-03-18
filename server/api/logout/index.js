/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 14:52:29 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 15:06:36 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

exports.logout = function(req, res) {
	if (!req.body.key) {
		return res.json({ 'code' : '4343', 'error' : 'key required' });
	}
	req.app.db.models.User.findByIdAndUpdate(req.body.key, { isActive: 'no' },
		function(err, user) {
			if (err) {
				return res.json({ 'code' : '4444', 'exception' : err });
			}
			if (!user) {
				return res.json({ 'code' : '4343', 'error' : 'Could not set inactive' });
			}
			return res.json({ 'code' : '4242', 'response' : 'User logged out' });
		});
};
