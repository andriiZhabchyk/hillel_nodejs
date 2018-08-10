'use strict';

const Joi = require('joi');

module.exports.updateUserInfoValidation = {
    body: {
        username: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().trim().min(4).max(20).optional(),
        description: Joi.string().max(512).optional()
    }
};