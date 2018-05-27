'use strict';

// express router dependencies
const express = require('express'),
    imagesRouter = express.Router();

// middleware
const fileHandler = require('./middlewares').fileHandler;

// dependencies
const fs = require('fs'),
    path = require('path'),
    fileType = require('file-type');

imagesRouter
    .get('/:image', fileHandler, (req, res) => {
        const imagePath = path.join(__dirname, '..', 'images', req.params.image),
            imageStream = fs.createReadStream(imagePath, {
                highWaterMark: 512
            });

        imageStream.once('data', chunk => {
            const type = fileType(chunk);
            res.type(type.mime);
        });

        imageStream.pipe(res);
    });

module.exports = imagesRouter;