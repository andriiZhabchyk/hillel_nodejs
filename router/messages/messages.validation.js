'use strict';

const Joi = require('joi');

module.exports.addNewMessage = {
    body: {
        username: Joi.string().trim().regex(/^[a-zA-Z]{3,}$/),
        message: Joi.string().trim().min(3).max(512).required(),
        show: Joi.number().min(1).max(60).integer().default(30)
    }
};