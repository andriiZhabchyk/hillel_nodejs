'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const MessageSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        default: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        minLength: 3,
        required: true
    },
    message: {
        type: String,
        minLength: 1,
        maxLength: 512,
        required: true
    },
    show: {
        type: Date,
        expires: 0,
        index: -1
    }
}, {
    timestamps: true,
    collection: 'messages',
});

MessageSchema.statics = {
    findActiveMessages: function () {
        return this.find({show: {$gte: new Date()}})
    }
};

MessageSchema.pre('save', function () {
   if (this.isNew) {
        this.show = new Date(new Date().getTime() + this.show * 1000);
   }
});

module.exports = mongoose.model('MessageModel', MessageSchema);