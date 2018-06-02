'use strict';

// express dependencies
const express = require('express'),
    app = express();

// server configuration
const PORT = process.env.PORT || 3000,
    router = require('./router');

const jsonfile = require('jsonfile'),
    path = require('path');

app.set("views engine", "hbs");
app.use('/', router);

// interval for control message expiration time
setInterval(() => {
    const dataPath = path.join(__dirname, 'data', 'messages.json');
    jsonfile.readFile(dataPath, (err, messages) => {
        if (!messages) return;

        messages.forEach((message, i) => {
            if (message.endAt <= Date.now()) {
                messages.splice(i, 1);
                jsonfile.writeFile(dataPath, messages);
            }
        });
    });
}, 1000);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});