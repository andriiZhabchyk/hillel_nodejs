'use strict';

const express = require('express'),
    router = express.Router();

router.use('/', (req, res) => {
    if (req.user.roles.includes('admin')) {
        res.end('Hello admin!');
    } else {
        res.redirectTo('/');
    }
});

module.exports = router;