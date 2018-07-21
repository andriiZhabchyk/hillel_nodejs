'use strict';

const Joi = require('joi');

module.exports.addNewComment = {
    body: {
        postId: Joi.string().required(),
        comment: Joi.string().required()
    }
};