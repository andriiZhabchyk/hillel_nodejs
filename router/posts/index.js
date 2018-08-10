'use strict';

const express = require('express'),
    postRouter = express.Router();

const mdlw = require('../middlewares');

const {
    addPostValidation,
    updatePostValidation,
    deletePostValidation
} = require('./posts.validation');

const {
    getPosts,
    addNewPost,
    getPost,
    updatePost,
    deletePost
} = require('./posts.controller');

postRouter
    .route('/')

    /*
    *  get all posts
    * */
    .get(getPosts)

    /**
     * @api {POST} /api/posts Add new post
     * @apiVersion 0.0.1
     * @apiGroup Posts
     * @apiPermission all
     *
     * @apiParam {String} title Post title.
     * @apiParam {String} body Post body.
     * @apiParam {String} tags Post tags.
     *
     * @apiParamExample {json} Request-Example:
     *     {
     *          "title": "TEst title"
     *          "body": "TEst body"
     *          "tags": ["#teg1, #teg2"]
     *    }
     *
     **/
    .post(mdlw.auth, mdlw.validate(addPostValidation), addNewPost);

postRouter
    .route('/:id')

    /**
    *  @api {GET} /api/posts/:id Get one post
    *  @apiVersion 1.0.0
    *  @apiGroup Posts
    *  @apiPermission all
    *
    *  @apiParamExample {json} Request-Example:
    *     {
    *       "id": "5b58e6ef281c8a6bfba6f7fd"
    *     }
    *
     * @apiSuccessExample {json} Success-Response:
     *   HTTP/1.1 200 OK
     *      {
     *          "_id" : ObjectId("5b58e6ef281c8a6bfba6f7fd"),
     *          "show" : true,
     *          "comments" : [
     *              ObjectId("5b59bb832c466d1d8d518ef0"),
     *              ObjectId("5b59be9a0dfa08242f61c082"),
     *              ObjectId("5b59beb4dc52b9264868bc38"),
     *              ObjectId("5b59bfb6da3c48268580330c")
     *          ],
     *          "tags" : [
     *              "teg"
     *          ],
     *          "addedBy" : ObjectId("5b58de77fc6d8d5a3c89bdd9"),
     *          "title" : "TEst",
     *          "body" : "sdfsdf sdfsdfs dfsd",
     *          "createdAt" : ISODate("2018-07-25T21:09:03.225Z"),
     *          "updatedAt" : ISODate("2018-07-26T12:33:58.887Z"),
     *          "__v" : 4
     *      }
     **/
    .get(mdlw.validate(addPostValidation), getPost)

    /**
     * @api {PUT} /api/posts/:id Update one post
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiPermission user
     *
     * @apiParam {String} [title] Post title (Required without body).
     * @apiParam {String} [body] Post body (Required without title).
     *
     * @apiParamExample {json} First-Request-Example:
     *     {
     *         "title": "Test title"
     *     }
     * @apiParamExample {json} Second-Request-Example:
     *     {
     *         "body": "Post test for testing"
     *     }
     *
     * @apiParamExample {json} Third-Request-Example:
     *     {
     *         "title": "Test title"
     *         "body": "Post test for testing"
     *     }
     *
     * @apiSuccessExample {status} Success-Response:
     *      HTTP/1.1 200 OK
     *
     * **/
    .put(mdlw.auth, mdlw.validate(updatePostValidation), updatePost)

    /**
     * @api {delete} /api/posts/:id Delete post
     * @apiVersion 1.0.0
     * @apiGroup Posts
     * @apiPermission user
     *
     * @apiParam {String} [id] Post ObjectID for delete.
     *
     * @apiParamExample {json} First-Request-Example:
     *     {
     *         "id": "5b6de0a8ebf0e61ef9bbfd59"
     *     }
     *
     * @apiSuccessExample {status} Success-Response:
     *      HTTP/1.1 200 OK
     *
     * **/
    .delete(mdlw.auth, mdlw.validate(deletePostValidation), deletePost);

module.exports = postRouter;