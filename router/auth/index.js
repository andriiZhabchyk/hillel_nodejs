'use strict';

// express dependencies
const express = require('express'),
    authRouter = express.Router();

// middleware's
const authMdlw = require('../middlewares');

// validation schemas
const {login} = require('./auth.validation');

const passport = require('passport');

authRouter
    .route('/login')
    .get((req, res) => {
        // console.log(req.user);
        // console.log(req.session);
        res.render('login.hbs');
    })

    .post(authMdlw.validate(login), passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    }));

module.exports = authRouter;