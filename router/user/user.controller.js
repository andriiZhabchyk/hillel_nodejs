'use strict';

const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    UserModel = require('./user.model'),
    PostModel = require('../posts/posts.model'),
    CommentsModel = require('../comments/comments.model');

module.exports.updateUserInfo = (req, res) => {
    UserModel
        .findOneAndUpdate({
                _id: req.user._id
            },
            req.body
        ).exec((err, result) => {
        if (err) {
            return res.status(500).send('User info has not been updated.');
        }
        res.sendStatus(200);
    });
};

module.exports.getUserActivity = (req, res) => {
    UserModel
        .aggregate([
            {
                $match: { _id: new ObjectId(req.user._id) }
            }, {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "addedBy",
                    as: "posts"
                }
            }, {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "addedBy",
                    as: "comments"
                }
            }
        ])
        .exec((err, user) => {
            if (err) {
                return res.status(500).send('Comment has not been saved.');
            }

            res.json(...user);
        });
};

module.exports.getCurrentUser = (req, res) => {
    res.status(200).send(req.isAuthenticated() ? req.user : null);
};
