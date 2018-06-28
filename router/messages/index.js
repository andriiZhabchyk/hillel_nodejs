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
            .then((result) => {
                res.status(200).send('Successfully add new message.');
            })
            .catch((err) => {
                res.status(500).send({message: 'New message has not been saved.', err});
            });
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