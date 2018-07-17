'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
});

UserSchema.pre('save', function () {
    if (this.isNew) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12), null);
    }
});

module.exports = mongoose.model('UserModel', UserSchema);