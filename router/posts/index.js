'use strict';

// express dependencies
const express = require('express'),
    postRouter = express.Router();

const mdlw = require('../middlewares');
const {addNewPost} = require('./post.validation');

const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    postModel = require('./post.model'),
    commentModel = require('../comments/comment.model');

postRouter
    .route('/')
    /*
    *  get all posts
    * */
    .get((req, res) => {
        postModel
            .aggregate([
                {
                    $lookup:
                        {
                            from: "users",
                            localField: "addedBy",
                            foreignField: "_id",
                            as: "by"
                        }
                }
            ])
            .exec((err, posts) => {
                if(err) return res.status(400).send({error: err.message});

                res.render('index.hbs', {
                    user: req.user,
                    posts
                });
            });
    })

    /*
    *  add new posts to db
    * */
    .post(mdlw.validate(addNewPost), (req, res) => {
        postModel
            .create({
                addedBy: req.user._id,
                ...req.body
            })
            .then((result) => {
                res.status(200).send('Successfully add new post.');
            })
            .catch((err) => {
                res.status(500).send({message: 'New posts has not been saved.', err});
            });
    });

postRouter
    .route('/:id')

    /*
    *  Get one post by id
    * */
    .get((req, res) => {
        postModel
            .aggregate([
                {
                    $match: {_id: new ObjectId(req.params.id)}
                },
                {
                    $lookup:
                        {
                            from: "users",
                            localField: "addedBy",
                            foreignField: "_id",
                            as: "by"
                        }
                }
            ])
            .exec((err, post) => {
                commentModel
                    .find({_id: {$in: post.comments}}, (err, comments) => {
                       console.log(comments);
                    });
                // console.log(post);
                res.render('post.hbs', {
                    user: req.user,
                    post: post[0]
                });
            });
    });

module.exports = postRouter;