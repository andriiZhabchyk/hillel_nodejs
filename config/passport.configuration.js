'use strict';

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../router/users/user.model');

const bcrypt = require('bcrypt-nodejs');

module.exports = () => {
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            UserModel
                .findOne({ email: email })
                .exec((err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        return done({
                            status: 400,
                            message: "No user found."
                        });
                    } else {
                        if (!bcrypt.compareSync(password, user.password)) {
                            return done({
                                status: 400,
                                message: "Not correct data"
                            });
                        }

                        return done(null, user);
                    }
                });
        }
    ));

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            UserModel
                .findOne({ email: email })
                .exec((err, user) => {
                    if (err) {
                        return done({err});
                    }

                    if (user) {
                        return done({
                            status: 400,
                            message: 'That email is already taken.'
                        });
                    }

                    UserModel
                        .create(req.body, (err, newUser) => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                });
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(id, cb) {
        cb(null, id);
    });

};