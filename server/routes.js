/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:08:25 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 12:08:27 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

var Users = require('./models/User.model');

exports = module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.end("Hello you!");
  });

  // Used to create a user
  // Inside the body set:
  // userName: String
  // password: String
  // regId: String
  app.post('/api/createUser', require('./api/createUser').createUser);

  // For loging a user
  // Inside the body set:
  // userName: String
  // password: String
  // regId: String
  app.post('/api/login', require('./api/login').login);

  // To transfer messages
  // Inside the body set:
  // key: String
  // from: String
  // to: String
  // msg: String
  app.post('/api/send', require('./api/send').send);

  // To add a friend
  // Inside the body set:
  // key: String
  // userName: String
  app.post('/api/addFriend', require('./api/addFriend').addFriend);

  // To list all friends
  // Inside the body set:
  // key: String
  app.post('/api/listFriends', require('./api/listFriends').listFriends);
};
