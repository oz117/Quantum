'use strict';

// Dependencies
var config = require('./config'),
		express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		passport = require('passport'),
		gcm = require('node-gcm');

// create express app
var app = express();

// mongoose setup
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));

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