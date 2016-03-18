/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   config.example.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:09:02 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 12:09:03 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

// Configuration file containing the port in which the app runs
// the url for the database
// and the Api key if you need/want to use gcm
// this is only an example of configuration file

exports.port = process.env.PORT || 4000;
exports.mongodb = {
	uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/Quantum'
};
exports.gcmApiKey = 'YOUR_API_KEY';
