'use strict';

// express dependencies
const express = require('express'),
    fileRouter = express.Router();

const multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    rootPath = require('app-root-path').path;

const allowedFileTypes = ['jpeg', 'jpg', 'png', 'gif'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(rootPath, 'static');
        if(!fs.existsSync(destinationPath)) fs.mkdirSync(destinationPath);
        cb(null, path.join(rootPath, 'static'));
    },
    filename: function (req, file, cb) {
        const fileMimeType = file.mimetype;
        const fileType = fileMimeType.split('/');

        if (!allowedFileTypes.includes(fileType[1])) {
            return cb({message: 'Not allowed file type.'})
        }
        cb(null, `${file.fieldname}-${Date.now()}.${fileType[1]}`);
    }
});

const upload = multer({storage});
// upload.single('avatar')

fileRouter
    .route('/upload')
    .post(upload.single('user_avatar'), (req, res) => {
        res.status(200).send({avatar: req.file.filename});
    });

module.exports = fileRouter;