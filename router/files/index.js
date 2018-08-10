'use strict';

// express dependencies
const express = require('express'),
    fileRouter = express.Router();

const multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    rootPath = require('app-root-path').path;

const {
    uploadAvatar,
    uploadPostImage
} = require('./files.controller');

const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(rootPath, 'static', 'img');
        if(!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);
        cb(null, path.join(rootPath, 'static', 'img'));
    },
    filename: function (req, file, cb) {
        const fileMimeType = file.mimetype;
        const fileType = fileMimeType.split('/');

        if (!allowedFileTypes.includes(fileType[1])) {
            return cb({message: 'Not allowed file type.'})
        }
        cb(null, `${file.fieldname}-${req.params.id || req.user._id}.${fileType[1]}`);
    }
});

const upload = multer({storage});

fileRouter
    .route('/avatar')
    .post(upload.single('user_avatar'), uploadAvatar);

fileRouter
    .route('/images/:id')
    .post(upload.single('post_images'), uploadPostImage);

module.exports = fileRouter;