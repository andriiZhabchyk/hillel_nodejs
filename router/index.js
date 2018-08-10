'use strict';

const express = require('express'),
    router = express.Router();

const posts = require('./posts'),
    auth = require('./auth'),
    files = require('./files'),
    comments = require('./comments'),
    user = require('./user');

const mdlw = require('./middlewares');

// auth api
router.use('/auth', auth);

// files api
router.use('/files', mdlw.auth, files);

// posts api
router.use('/posts', posts);

// main api
router.use('/comments', mdlw.auth, comments);

// user api
router.use('/user', user);


// error handlers
router.use(mdlw.errorHandler);
router.use('**', mdlw.routeHandler);

module.exports = router;