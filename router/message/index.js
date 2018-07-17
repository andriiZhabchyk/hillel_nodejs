'use strict';

// express dependencies
const express = require('express'),
    messagesRouter = express.Router();

// middleware's
const messageMdlws = require('../middlewares');

// validation schemas
const {addNewMessage} = require('./messages.validation');

// db models
const messageModel = require('./message.model');

messagesRouter
    .route('/')

    /*
    *  get all messages
    * */
    .get((req, res) => {
        messageModel
            .findActiveMessages()
            .sort({
                createdAt: req.query.created === 'asc' ? 1 : -1,
                username: req.query.user === 'asc' ? 1 : -1
            })
            .exec((err, messages) => {
                if(err) return res.status(400).send({error: err.message});
                res.render('index.hbs', {messages});
            });
    })

    /*
    *  add new message to db
    * */
    .post(messageMdlws.validate(addNewMessage), (req, res) => {
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

    /*
    *  get one message by id
    * */
    .get((req, res) => {
        messageModel
            .findOne({_id: req.params.id})
            .exec((err, doc) => {
                res.json(doc);
            });
    });

module.exports = messagesRouter;