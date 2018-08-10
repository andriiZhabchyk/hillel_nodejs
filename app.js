'use strict';

const express = require('express'),
    app = express(),
    admin = express();

const PORT = process.env.PORT || 4000,
    router = require('./router'),
    adminRouter = require('admin_router');

const passport = require('passport');
const server = require('http').Server(app);
const path = require('path');

const io = require('socket.io')(server);
app.locals.io = io;

/* connect db to project */
require('./db');

// include express-sessions and passport to routes
app.use(require('./config/session.configuration'));
require('./config/passport.configuration')();

// body-parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initialize passport configuration for routes
app.use(passport.initialize());
app.use(passport.session());

/* Public && static files */
app.use(express.static(path.join(__dirname, 'public', 'dist', 'front')));
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', router);

/* Admin routes config */
admin.use('/', adminRouter);
app.use('/admin', admin);

/* Redirect otherwise requests to main app file. */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'front', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

module.exports = app;