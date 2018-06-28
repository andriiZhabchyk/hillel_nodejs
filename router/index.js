'use strict';

// express router dependencies
const express = require('express'),
    router = express.Router();

// child routes
const messages = require('./messages');

// db models
const messageModel = require('./messages/message.model');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// main routes
router.get('/', (req, res) => {
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

});

// main api endpoints
router.use('/messages', messages);

// error handler
router.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(400).send(err.details[0].message);
    } else {
        console.error(err);
        res.sendStatus(500);
    }
});

router.use('**', (req, res) => {
    res.status(404).send('Page not found.')
});

module.exports = router;