'use strict';

const Joi = require('joi');

module.exports.loginValidation = {
    body: {
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().min(4).max(20).required()
    }
};

module.exports.registrationValidation = {
    body: {
        username: Joi.string().min(4).max(32),
        email: Joi.string().email().trim().required(),
        password: Joi.string().trim().min(4).max(20).required(),
    }
};