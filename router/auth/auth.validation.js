'use strict';

const Joi = require('joi');

module.exports.login = {
    body: {
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().min(6).max(20).required(),
    }
};