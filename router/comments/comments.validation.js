'use strict';

const Joi = require('joi');

module.exports.getOneCommentValidation = {
    params: {
        id: Joi.string().required()
    }
};

module.exports.addNewCommentValidation = {
    body: {
        postId: Joi.string().required(),
        body: Joi.string().required()
    }
};

module.exports.updateCommentValidation = {
    body: {
        body: Joi.string().min(1).max(2048).required()
    }
};

module.exports.deleteCommentValidation = {
    body: {

    }
};