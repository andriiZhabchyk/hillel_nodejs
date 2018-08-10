'use strict';

const Joi = require('joi');

module.exports.addPostValidation = {
    body: {
        title: Joi.string().min(1).max(128).required(),
        body: Joi.string().min(1).max(4096).required(),
        tags: Joi.array().items(Joi.string()),
        addedBy: Joi.string().required()
    }
};

module.exports.updatePostValidation = {
    body: Joi.alternatives().try({
        title: Joi.string().min(1).max(128).required(),
        body: Joi.string().min(1).max(4096).required()
    }, {
        title: Joi.string().min(1).max(128).required(),
    }, {
        body: Joi.string().min(1).max(4096).required()
    })
};

module.exports.deletePostValidation = {
    params: {
        id: Joi.string().required()
    }
};