'use strict';

// express dependencies
const express = require('express'),
    messagesRouter = express.Router();

// additional
const jsonfile = require('jsonfile'),
    path = require('path');

// middleware
const messageValidator = require('../middleware').messageValidator;

const dataPath = path.join(__dirname, '..', '..', 'data', 'messages.json');

messagesRouter
    .route('/')
    .get((req, res) => {
        const { endAt, username } = req.query;
        jsonfile.readFile(dataPath, (err, messages) => {
            if (!messages) return res.send([]);

            if (username) {
                messages = messages.filter((msg) => msg.username === username);
            }

            if (endAt && endAt === 'asc') {
                messages = messages.sort((a, b) => a.endAt - b.endAt);
            } else if (endAt === 'desc') {
                messages = messages.sort((a, b) => b.endAt - a.endAt);
            }
            res.send(messages);
        });
    })
    .post(messageValidator, (req, res) => {
        jsonfile.readFile(dataPath, (err, messages) => {
            if (!messages) {
                messages = [];
            }

            messages.push(req.body);
            jsonfile.writeFile(dataPath, messages);
            res.status(200).send(`Successful added new message form ${req.body.username} with id ${messages.length}.`);
        });
    });

messagesRouter
    .route('/:param')
    .get((req, res) => {
        const param = req.params.param;

        jsonfile.readFile(dataPath, (err, messages) => {
            if (!messages) return res.status(404).send(`Message not found.`);

            const msg = messages.filter((message, i) => message.username === param || i === (param - 1));
            if (!msg) return res.status(404).send(`Message not found.`);
            res.send(msg);
        });
    });

module.exports = messagesRouter;