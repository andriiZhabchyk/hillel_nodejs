'use strict';

const util = require('util');

module.exports = (req, res, next) => {
    const { username, message, show } = req.body;
    if (!/^[a-zA-Z]+$/.test(username)) return res.status(400).send({message: 'Username should contain only latin letters.'});

    else if (!util.isString(message)) return res.status(400).send({message: 'Message should be a string.'});
    else if (!message.length) return res.status(400).send({message: 'Message should be a longer than 1 symbol.'});
    else if (message.length > 512) return res.status(400).send({message: 'Message should be a shorter than 512 symbols.'});

    else if (!util.isNumber(show))  return res.status(400).send({message: 'Show should be a number.'});
    else if (!Number.isInteger(show))  return res.status(400).send({message: 'Show should be an integer number.'});
    else if (show < 1)  return res.status(400).send({message: 'Show can\'t be less 1.'});
    else if (show > 60)  return res.status(400).send({message: 'Show can\'t be bigger than 60.'});

    req.body.endAt = Date.now() + (show * 1000);
    next();
};
