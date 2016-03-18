/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   User.model.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: paulos_a <paulos_a@epitech.eu>             +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/03/18 12:10:06 by paulos_a          #+#    #+#             */
/*   Updated: 2016/03/18 18:06:15 by paulos_a         ###   ########          */
/*                                                                            */
/* ************************************************************************** */

'use strict';

exports = module.exports = function(app, mongoose) {
  var userSchema = mongoose.Schema({
    userName : { type: String, required: true, unique: true, default: ''},
    password: { type: String, required: true},
    regId: { type: String, default: '' },
    isActive: { type: String },
    friends: { type: Array, default: [] },
    timeCreated: { type: Date, default: Date.now }
  });

  /**
  * Encrypts the password using bcrypt
  * password: String
  * done is a callback function
  */
  userSchema.statics.encryptPassword = function(password, done) {
    var bcrypt = require('bcrypt');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return done(err);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        return done(err, hash);
      });
    });
  };

  userSchema.statics.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcrypt');

    bcrypt.compare(password, hash, function(err, res) {
      return done(err, res);
    });
  };

  //Checks uniqueness of a user
  app.db.model('User', userSchema);
};
