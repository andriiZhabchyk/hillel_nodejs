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
        res.render('login.hbs');
    })

    .post(authMdlw.validate(login), passport.authenticate('local-login', {
        successRedirect: '/',
    }));

authRouter
    .route('/register')
    .get((req, res) => {
        res.render('register.hbs');
    })

    .post(passport.authenticate('local-signup', {
        successRedirect: '/'
    }));

module.exports = authRouter;