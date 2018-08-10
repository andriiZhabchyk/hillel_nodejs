'use strict';

const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    PostModel = require('./posts.model');

module.exports.getPosts = (req, res) => {
    PostModel
        .aggregate([
            {
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
        .exec((err, posts) => {
            if (err) {
                return res.status(400).send({
                    message: err.message
                });
            }
            res.json(posts);
        });
};

module.exports.addNewPost = (req, res, next) => {
    PostModel
        .create(req.body)
        .then((post) => {
            req.app.locals.io.emit('new_post', {postId: post._id});
            res.status(200).send({
                message: 'Successfully add new post.',
                postId: post._id
            });
        })
        .catch((err) => {
            next({
                status: 500,
                message: `New posts has not been saved. ${err}`
            });
        });
};

module.exports.getPost = (req, res) => {
    PostModel
        .aggregate([
            {
                $match: { _id: new ObjectId(req.params.id) }
            }, {
                $lookup: {
                    from: "users",
                    localField: "addedBy",
                    foreignField: "_id",
                    as: "by"
                }
            }, {
                $graphLookup: {
                    from: "comments",
                    startWith: "$comments",
                    connectFromField: "comments",
                    connectToField: "_id",
                    as: "comments"
                }
            },
            { $unwind: '$by' },
            {
                $unwind: {
                    path: '$comments',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "comments.addedBy",
                    foreignField: "_id",
                    as: "comments.addedBy"
                }
            },
            {
                $unwind: {
                    path: '$comments.addedBy',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: {
                        _id: '$_id',
                        editable: '$editable',
                        tags: '$tags',
                        body: '$body',
                        title: '$title',
                        createdAt: '$createdAt',
                        image: '$image',
                        addedBy: '$by'
                    },
                    comments: { $push: {$ifNull: [null, '$comments'] } }
                }
            },
            {
                $project: {
                    _id: '$_id._id',
                    editable: '$_id.editable',
                    tags: '$_id.tags',
                    body: '$_id.body',
                    title: '$_id.title',
                    createdAt: '$_id.createdAt',
                    image: '$_id.image',
                    addedBy: '$_id.addedBy',
                    comments: {
                        $filter: {
                            input: '$comments',
                            as: 'comment',
                            cond: { $ne: [ "$$comment", {} ] }
                        }
                    }
                }
            }
        ])
        .exec((err, post) => {
            if (err) {
                return res.status(500).send('Post not found');
            } else if (!post.length) {
                return res.status(400)
                    .send('Post not found');
            }
            res.json(...post);
        });
};

module.exports.updatePost = (req, res) => {
    PostModel
        .findOneAndUpdate({
            _id: new ObjectId(req.params.id),
            addedBy: req.user._id
        },
            req.body
        )
        .exec((err, result) => {
            if (err) {
                return res.status(500).send('Post has not been updated');
            }
            res.sendStatus(200);
        });
};

module.exports.deletePost = (req, res) => {
    PostModel
        .deleteOne({
            _id: new ObjectId(req.params.id),
            addedBy: req.user._id
        })
        .exec((err, result) => {
            if (err) {
                return res.status(500).send('Post has not deleted.');
            }
            res.sendStatus(200);
        })
};
