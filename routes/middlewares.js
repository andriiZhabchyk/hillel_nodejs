'use strict';

// dependencies
const fs = require('fs'),
    path = require('path');

function logger(req, res, next) {
    const logFilePath = path.join(__dirname, '..', 'logs', 'requests.log'),
        logsStream = fs.createWriteStream(logFilePath, {flags: 'a'});

    const startedAt = Date.now();
    res.on('finish', () => {
        logsStream.write(`${req.method} ${req.url} ${Date.now() - startedAt}ms ${res.statusCode} ${req.headers['user-agent']} \n`);
    });
    next();
}

function fileHandler(req, res, next) {
    const filePath = path.join(__dirname, '..', 'images', req.params.image);
    fs.open(filePath, 'r', (err, cb) => {
        if (err) {
            switch (err.code) {
                case 'ENOENT':
                    return res.status(404).send('File not found');

                default:
                    return res.status(500).end();
            }
        }

        next();
    });
}

module.exports = {
    logger,
    fileHandler
};