'use strict';

const ObjectId = require('mongoose').Types.ObjectId,
    CommentModel = require('./comments.model'),
    PostsModel = require('../posts/posts.model'),
    UserModel = require('../user/user.model');

module.exports.getOneCommentCtrl = (req, res) => {
    CommentModel
        .aggregate([
            {
                $match: { _id: new ObjectId(req.params.id) }
            }, {
                $lookup: {
                    from: "users",
                    localField: "addedBy",
                    foreignField: "_id",
                    as: "addedBy"
                }
            }, {
                $unwind: '$addedBy'
            }
        ])
        .exec((err, comment) => {
            if (err) {
                return res.status(400).send('Comment not found.');
            }
            res.json(...comment);
        });
};

module.exports.addCommentCtrl = (req, res) => {
    const { body } = req.body;

    CommentModel
        .create({
            addedBy: req.user._id,
            body
        }, (err, comment) => {
            if (err) {
                return res.status(500).send('Comment has not been saved.');
            }

            PostsModel
                .findOne({_id: new ObjectId(req.body.postId)})
                .exec((err, post) => {
                    if (err) {
                        return res.status(500).send('Comment has not been saved.');
                    }
                    post.comments.push(comment._id);
                    post.save();

                    req.app.locals.io.emit('new_comment', {
                        postId: post._id,
                        commentId: comment._id
                    });
                    res.status(200).send({
                        message: 'Successfully add new comment.',
                    });
                });
        });
};

module.exports.updateCommentCtrl = (req, res) => {
    const { body } = req.body;

    CommentModel
        .findOneAndUpdate({
            _id: new ObjectId(req.params.id)
        }, {
            body
        }, {
            new: true
        })
        .exec((err, comment) => {
            if (err) {
                return res.status(500).send('Comment has not been saved.');
            }

            req.app.locals.io.emit('update_comment', {
                commentId: comment._id
            });
            res.status(200).send({
                message: 'Successfully update comment.',
            });
        });

};

module.exports.deleteCommentCtrl = (req, res) => {

};
