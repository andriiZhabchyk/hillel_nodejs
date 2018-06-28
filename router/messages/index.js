'use strict';

// express dependencies
const express = require('express'),
    messagesRouter = express.Router();

// middleware's
const messageMdlws = require('./messages.mdlw');

// validation schemas
const validationSchemas = require('./messages.validation');

// db models
const messageModel = require('./message.model');

messagesRouter
    .route('/')
    .post(messageMdlws.validate(validationSchemas.addNewMessage), (req, res) => {
        messageModel
            .create(req.body)
            .then((res) => {

            })
            .catch((err) => {

            });
        res.end();
    });

messagesRouter
    .route('/:id')
    .get((req, res) => {
        messageModel
            .findOne({_id: req.params.id})
            .exec((err, doc) => {
                res.json(doc);
            });
    });

module.exports = messagesRouter;