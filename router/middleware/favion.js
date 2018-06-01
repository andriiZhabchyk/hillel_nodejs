'use strict';

// dependencies
const path = require('path'),
    fs = require('fs');

module.exports = (req, res, next) => {
    if (req.url === '/favicon.ico') {
        const faviconPath = path.join(__dirname, '..', '..', 'assets', 'favicon.ico'),
            faviconStream = fs.createReadStream(faviconPath);
        return faviconStream.pipe(res);
    }

    next();
};