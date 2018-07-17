'use strict';

const Joi = require('joi');

module.exports.login = {
    body: {
        username: Joi.string().trim().regex(/^[a-zA-Z]{3,}$/).required(),
        password: Joi.string().trim().min(6).max(20).required(),
    }
};