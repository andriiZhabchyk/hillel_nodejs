'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CommentSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        default: mongoose.Types.ObjectId
    },
    addedBy: {
        username: String,
        userId: Schema.ObjectId
    },
    body: {
        type: String,
        minLength: 1,
        maxLength: 2048,
        required: true
    }
}, {
    timestamps: true,
    collection: 'comments',
});

module.exports = mongoose.model('CommentModel', CommentSchema);