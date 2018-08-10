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
    image: String,
    editable: {
        type: Boolean,
        default: true
    },
    editableTo: Date,
    comments: [{type: Schema.ObjectId, ref: 'comments'}],
    tags: [String]
}, {
    timestamps: true,
    collection: 'posts',
});

MessageSchema.pre('save', function () {
   if (this.new) {
       const date = new Date();
       this.editable = date.setHours(date.getHours() + 24);
   }
});

module.exports = mongoose.model('PostsModel', MessageSchema);