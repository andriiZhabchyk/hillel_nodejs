'use strict';

const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const UserModel = require('./user.model');

const bcrypt = require('bcrypt-nodejs');

module.exports = () => {
    passport.use('local-login', new LocalStrategy( {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            UserModel
                .findOne({ username:  username })
                .exec((err, user) => {
                    if (err) {
                        return done(err);
                    }

                    if (!user) {
                        const newUser = new UserModel();
                        newUser.username = username;
                        newUser.password = password;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser._id);
                        });
                    } else {
                        if (!bcrypt.compareSync(password, user.password)) {
                            return done({message: "Not correct data"});
                        }

                        return done(null, user._id);
                    }
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