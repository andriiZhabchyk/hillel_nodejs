'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const PhoneSchema = new mongoose.Schema({
    _id: false,
    code: String,
    phone: String
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    avatar: {type: String},
    phone: [PhoneSchema],
    description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'users'
});

UserSchema.pre('save', function () {
    if (this.isNew) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12), null);
    }
});

module.exports = mongoose.model('UserModel', UserSchema);