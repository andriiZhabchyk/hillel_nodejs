'use strict';

const expressSession = require('express-session'),
    MongoStore = require('connect-mongo')(expressSession),
    mongoose = require('mongoose'),
    sessionConfig = require('../../config/project.config').session;

module.exports = expressSession({
    secret: sessionConfig.secret,
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: 60000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
});