'use strict';

const express = require('express'),
    userRouter = express.Router();

const mdlw = require('../middlewares');

const {
    updateUserInfoValidation
} = require('./user.validation');

const {
    getUserInfo,
    updateUserInfo,
    getUserActivity,
    getCurrentUser
} = require('./user.controller');

userRouter
    .route('/info')

    /**
     * @api {PUT} /user/info Update user info
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiPermission user
     *
     * @apiParam {String} [username] User name.
     * @apiParam {String} [email] User email.
     * @apiParam {String} [password] User password.
     * @apiParam {String} [description] User description.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *       username: "Josh"
     *     }
     *
     * @apiParamExample {json} Second-Request-Example:
     *     {
     *       username: "Josh",
     *       email: "test@user.com",
     *       password: "dwfff323_df",
     *       description: "About me"
     *     }
     *
     * @apiSuccessExample {text/plain} Success-Response:
     *     HTTP/1.1 200 OK
     *
     **/
    .put(mdlw.auth, mdlw.validate(updateUserInfoValidation), updateUserInfo);

userRouter
    .route('/activity')

    /**
     * @api {PUT} /user/activity Get user activity
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiPermission user
     *
     * @apiSuccessExample {Content-Type: text/html; charset=utf-8} Success-Response:
     *     HTTP/1.1 200 OK (Static file with posts and comments)
     *
    **/
    .get(mdlw.auth, getUserActivity);

userRouter
    .route('/current')
    .get(getCurrentUser);

module.exports = userRouter;

