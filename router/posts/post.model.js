'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        default: mongoose.Types.ObjectId
    },
    title: {
        type: String,
        minLength: 3,
        required: true
    },
    addedBy: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    body: {
        type: String,
        required: true
    },
    show: {
        type: Boolean,
        default: true
    },
    comments: [{type: Schema.ObjectId, ref: 'comments'}],
    tags: [String]
}, {
    timestamps: true,
    collection: 'posts',
});

module.exports = mongoose.model('PostsModel', MessageSchema);