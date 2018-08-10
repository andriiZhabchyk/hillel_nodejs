'use strict';

const { celebrate } = require('celebrate');

module.exports.validate = (schema) => {
    return celebrate(schema, {stripUnknown: true});
};

module.exports.auth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next({
            status: 401,
            message: 'Unauthorized'
        });
    }
    next();
};

module.exports.errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).send(err.details[0].message);
    } else {
        if (!err.status) {
            return res.sendStatus(500);
        }
        res.status(err.status).send(err.message);
    }
};

module.exports.routeHandler = (req, res) => {
    res.status(404).send('Api endpoint not found.')
};

module.exports.getStaticFiles = (req, res, file) => {
    res.render(file);
};