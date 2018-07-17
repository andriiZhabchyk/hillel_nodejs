'use strict';

const { celebrate } = require('celebrate');

module.exports.validate = (schema) => {
    return celebrate(schema);
};

module.exports.checkAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/login');
    }
    next();
};

module.exports.errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).send(err.details[0].message);
    } else {
        console.error(err);
        res.sendStatus(500);
    }
};

module.exports.routeHandler = (req, res) => {
    res.status(404).send('Page not found.')
};