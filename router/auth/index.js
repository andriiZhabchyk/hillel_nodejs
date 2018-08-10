'use strict';

const express = require('express'),
    authRouter = express.Router();

const mdlw = require('../middlewares');

const {
    loginValidation,
    registrationValidation
} = require('./auth.validation');

const passport = require('passport');

authRouter
    .route('/login')

    /**
     * @api {POST} /auth/login Login
     * @apiVersion 1.0.0
     * @apiGroup Auth
     * @apiPermission user
     *
     * @apiParam {String{5...100}} email User email
     * @apiParam {String} password User password
     * @apiParam {String} [username] User username
     *
     * @apiParamExample {json} Request-Example
     *      {
     *          "email": "sdf@asd.asd"
     *          "password": "3d23d23d2"
     *      }
     *
     * @apiSuccess {String{24}} User ObjectId
     * @apiSuccess {String{5...100}} email User email
     * @apiSuccess {String} password User password
     * @apiSuccess {String} addedAt User addedAt
     * @apiSuccess {String} User ObjectId
     *
     * **/
    .post(mdlw.validate(loginValidation), passport.authenticate('local-signin'), (req, res) => {
        res.redirect('/');
    });

authRouter
    .route('/register')

    /**
     * @api {POST} /auth/register Registration
     * @apiVersion 1.0.0
     * @apiGroup Auth
     * @apiPermission all
     *
     * @apiParamExample {json} Request-Example
     *      {
     *          "username": "Test Josh",
     *          "email": "test@gmail.com",
     *          "password": "3d23*_d23d2"
     *      }
     *
     * @apiParam {String{4...32}} username User name
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     *
     * **/
    .post(mdlw.validate(registrationValidation),  passport.authenticate('local-signup'), (req, res) => {
        res.redirect('/');
    });

authRouter
    .route('/logout')

    /**
     * @api {POST} /auth/logout Logout
     * @apiVersion 1.0.0
     * @apiGroup Auth
     * @apiPermission user
     *
     * **/
    .post((req, res) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });

module.exports = authRouter;
