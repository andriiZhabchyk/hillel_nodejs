'use strict';

const express = require('express'),
    app = express();

const PORT = process.env.PORT || 3000,
    router = require('./router');

const passport = require('passport');

/* connect db to project */
require('./db');

app.set("views engine", "hbs");

// include express-sessions and passport to routes
app.use(require('./config/session.configuration'));
require('./config/passport.configuration')();

// body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize passport configuration for routes
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});