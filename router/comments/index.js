'use strict';

const express = require('express'),
    commentRouter = express.Router();

const mdlw = require('../middlewares'),
    {addNewComment} = require('./comment.validation');

const ObjectId = require('mongoose').Types.ObjectId,
    CommentModel = require('./comment.model'),
    PostsModel = require('../posts/post.model');

commentRouter
    .route('/')
    .post(mdlw.validate(addNewComment), (req, res) => {
        CommentModel
            .create({
                addedBy: req.user._id,
                body: req.body.comment
            }, (err, result) => {
                if (err) {
                    return res.status(500).send('Comment has not been saved.');
                }

                console.log(result);

                PostsModel
                    .findOne({_id: new ObjectId(req.body.postId)})
                    .exec((err, post) => {
                        if (err) {
                            return res.status(500).send('Comment has not been saved.');
                        }
                        post.comments.push(result._id);
                        post.save();
                    });
                res.status(200).send('Successfully add new comment.');
            });
    });

module.exports = commentRouter;