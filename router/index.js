'use strict';

const express = require('express'),
    router = express.Router(),
    posts = require('./posts'),
    auth = require('./auth'),
    files = require('./files'),
    comments = require('./comments');

const mdlw = require('./middlewares');

const fs = require('fs'),
    path = require('path');

router.get('/', (req, res) => {
    res.redirect('/posts');
});

router.get('/static/*', (req, res) => {
    const requirePath = req.url.split('/'),
        pathToFile = path.join(...requirePath);

    const fileStream = fs.createReadStream(pathToFile, {highWaterMark: 512});
    fileStream.pipe(res);
});

// auth endpoints
router.use('/auth', auth);

// main api endpoints
router.use('/files', files);

// main api endpoints
router.use('/posts', mdlw.checkAuth, posts);

// main api endpoints
router.use('/comments', mdlw.checkAuth, comments);

// error handlers
router.use(mdlw.errorHandler);
router.use('**', mdlw.routeHandler);

module.exports = router;