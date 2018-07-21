'use strict';

const Joi = require('joi');

module.exports.addNewPost = {
    body: {
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.string().required()
    }
};