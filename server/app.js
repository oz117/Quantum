/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:09:18 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 12:09:19 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

// Dependencies
var config = require('./config'),
		express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		gcm = require('node-gcm'),
		passport = require('passport');

// create express app
var app = express();

// mongoose setup
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));

// node-gcm setup
app.gcm = gcm;
app.sender = new gcm.Sender(config.gcmApiKey);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

// Routes
require('./routes')(app, passport);
require('./models')(app, mongoose);

// passport setup
require('./passport')(app, passport);

app.listen(config.port, function() {
	console.log('The App runs on port ' + config.port);
});
