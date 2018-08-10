'use strict';

const express = require('express'),
    commentRouter = express.Router();

const mdlw = require('../middlewares');

const {
    getOneCommentValidation,
    addNewCommentValidation,
    updateCommentValidation,
    deleteCommentValidation
} = require('./comments.validation');

const {
    getOneCommentCtrl,
    addCommentCtrl,
    updateCommentCtrl,
    deleteCommentCtrl
} = require('./comments.controller');

commentRouter
    .route('/')

    /**
     * @api {POST} /comments Add new comment
     * **/
    .post(mdlw.validate(addNewCommentValidation), addCommentCtrl);

commentRouter
    .route('/:id')

    /**
     * @api {GET} /comments Get one comment
     * **/
    .get(mdlw.validate(getOneCommentValidation), getOneCommentCtrl)

    /**
     * @api {PUT} /comments Update comment
     * **/
    .put(mdlw.validate(updateCommentValidation), updateCommentCtrl)

    /**
     * @api {DELETE} /comments Delete comment
     * **/
    .delete(mdlw.validate(deleteCommentValidation), deleteCommentCtrl);

module.exports = commentRouter;