'use strict';

// express router dependencies
const express = require('express'),
    router = express.Router();

// dependencies
const path = require('path'),
    fs = require('fs');

// child routes
const messagesRouter = require('./routes/messages');

// middleware
const faviconHandler = require('./middleware').faviconHandler;

router.use(express.static(path.join(__dirname, '..', 'assets', 'images'))); // static image files
router.use(faviconHandler); // favicon middleware

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// root routes
router.get('/', (req, res) => {
        const imagesPath = path.join(__dirname, '..', 'assets', 'images'),
            messagesPath = path.join(__dirname, '..', 'data', 'messages.json');

        fs.readdir(imagesPath, (err, files) => {
            if (!files) return res.status(404).send('Images not found');

            const messagesStream = fs.createReadStream(messagesPath, { highWaterMark: 512 });
            let messages = '';

            messagesStream.on('data', (chunk) => {
                messages += chunk;
                console.log(chunk);
                console.log(messages);

                res.render('index.hbs', {
                    images: files.map(file => {
                        const altText = file.split('.');
                        return {
                            image: file,
                            altText: altText[0].toLowerCase()
                        }
                    }),
                    messages: JSON.parse(messages)
                });
            });
        });
    });

router.use('/messages', messagesRouter);

module.exports = router;