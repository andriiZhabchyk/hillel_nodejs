'use strict';

const UserModel = require('../user/user.model');
const PostModel = require('../posts/posts.model');

module.exports.uploadAvatar = (req, res) => {
    UserModel
        .findOneAndUpdate({
            _id: req.user._id
        }, {
            avatar: req.file.filename
        })
        .exec((err, user) => {
           if (err) {
               return res.status(500).send('Avatar not uploaded.');
           }

           req.app.locals.io.emit('update_user_info', {
               userId: user._id
           });
           res.end();
        });
};

module.exports.uploadPostImage = (req, res) => {
    PostModel
        .findOneAndUpdate({
            _id: req.params.id
        }, {
            image: req.file.filename
        })
        .exec((err, result) => {
            if (err) {
                return res.status(500).send('Image not added.');
            }

            res.sendStatus(200);
        });
};