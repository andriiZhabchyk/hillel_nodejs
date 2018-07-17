'use strict';

// express router dependencies && routes
const express = require('express'),
    router = express.Router(),
    messages = require('./message'),
    auth = require('./auth');

// middleware
const mdlw = require('./middlewares');

router.get('/', (req, res) => res.redirect('/messages'));

// auth endpoints
router.use('/auth', auth);

// main api endpoints
router.use('/messages', mdlw.checkAuth, messages);

// error handlers
router.use(mdlw.errorHandler);
router.use('**', mdlw.routeHandler);

module.exports = router;