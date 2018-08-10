'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ['user'],
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
    description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'users'
});

function hashPassword() {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12), null);
}

UserSchema.pre('save', hashPassword);
UserSchema.pre('findOneAndUpdate', hashPassword);

module.exports = mongoose.model('UserModel', UserSchema);