'use strict';

// express dependencies
const express = require('express'),
    app = express();

// server configuration
const PORT = process.env.PORT || 3000,
    router = require('./routes');

// middleware
const logger = require('./routes/middlewares').logger;

const path = require('path');

app.use(logger);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/images', router);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});