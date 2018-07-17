'use strict';

// mongodb  dependencies
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chat');
mongoose.set("debug", process.env.ENVIRONMENT === 'development');


mongoose.connection.on('open', () => {
   console.log('Mongodb successfully connected.');
});

mongoose.connection.on('error', (err) => {
    console.error(`Error on connect to mongodb: ${err}`);
    process.exit(0);
});