'use strict';

// mongodb  dependencies
const mongoose = require('mongoose'),
    mongoConfig = require('../config/mongo.config');

const bcrypt = require('bcrypt-nodejs');

const env = process.env.ENVIRONMENT;
const mongoConfigUri = env === 'test' ? 'mongodb://127.0.0.1:27017/test_blog' : mongoConfig.uri;

const UserModel = require('router/user/user.model');

mongoose.connect(mongoConfigUri, { useNewUrlParser: true });
mongoose.set("debug", process.env.ENVIRONMENT === 'development');

mongoose.connection.on('open', () => {
    console.log('Mongodb successfully connected.');

    if (env !== 'test') {
        return;
    }
    UserModel
        .findOneAndUpdate({
            username: 'admin'
        }, {
            username: 'admin',
            password: bcrypt.hashSync('admin', bcrypt.genSaltSync(12), null),
            email: 'admin@blog.com',
            roles: ['admin']
        }, {
            upsert: true,
            new: true
        })
        .exec((err, admin) => {
            if (err) {
                console.log("Cannot find or create admin user before start app.")
            }

            if (env === 'development') {
                console.log("Successfully add blog admin.");
            }
        });
});

mongoose.connection.on('error', (err) => {
    console.error(`Error on connect to mongodb: ${err}`);
    process.exit(0);
});