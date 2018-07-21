'use strict';

const expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession),
    mongoose = require('mongoose'),
    sessionConfig = require('./project.config').session;

module.exports = expressSession({
    secret: sessionConfig.secret,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
});