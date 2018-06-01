'use strict';

// express dependencies
const express = require('express'),
    messagesRouter = express.Router();

// additional
const jsonfile = require('jsonfile'),
    path = require('path');

// middleware
const messageValidator = require('../middleware').messageValidator;

messagesRouter
    .route('/')
    .get((req, res) => {
        res.status(200).send('ok');
    })
    .post(messageValidator, (req, res) => {
        const dataPath = path.join(__dirname, '..', '..', 'data', 'messages.json');
        jsonfile.readFile(dataPath, (err, messages) => {
            if (!messages) {
                messages = [];
            }

            messages.push(req.body);
            jsonfile.writeFile(dataPath, messages);
            res.status(200).send('ok');
        });
    });

module.exports = messagesRouter;