/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   models.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:08:48 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 12:08:49 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

exports = module.exports = function(app, mongoose) {
	require('./models/User.model')(app, mongoose);
};
