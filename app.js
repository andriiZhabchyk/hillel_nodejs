'use strict';

// express dependencies
const express = require('express'),
    app = express();

// server configuration
const PORT = process.env.PORT || 3000,
    router = require('./router');

/* connect db to project */
require('./db');

app.set("views engine", "hbs");
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});