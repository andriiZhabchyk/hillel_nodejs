'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    expect = chai.expect;

const app = require('app');

const PostModel = require('router/posts/posts.model'),
    UserModel = require('router/user/user.model'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

chai.use(chaiHttp);

describe('Posts system.', () => {

    const agent = chai.request.agent(app);

    let postId,
        user;

    before(() => {
       PostModel
           .deleteMany({}, (err, res) => {});

        UserModel
            .findOne({
                email: 'test_mocha@test'
            }, (err, res) => {
               user = res;
            });
    });

    describe('Add new post', () => {
        it('Should login before add new post.', (done) => {
            agent
                .post('/api/auth/login')
                .send({
                    email: 'test_mocha@test',
                    password: 'test11'
                })
                .end(() => {
                    done();
                });
        });

        it('Should add new post.', (done) => {
            agent
                .post('/api/posts')
                .send({
                    title: 'Test title',
                    body: 'Test body',
                    tags: ['#tag1', '#tag2'],
                    addedBy: user._id
                })
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.be.eq('Successfully add new post.');
                    ObjectId.isValid(res.body.postId).should.be.eq(true);

                    postId = res.body.postId;
                    done();
                });
        });

        it('New post should contain main fields.', (done) => {
            PostModel
                .findOne({
                    _id: postId
                })
                .exec((err, post) => {
                    expect(err).to.be.null;

                    post.should.be.a('object');
                    ObjectId.isValid(post._id).should.be.eq(true);
                    expect(post.tags).to.be.an('array').include('#tag1', '#tag2');
                    expect(post.body).to.be.eq('Test body');
                    expect(post.title).to.be.eq('Test title');
                    done();
                });
        });

        it('Should logout after add new post.', (done) => {
            agent
                .post('/api/auth/logout')
                .end(() => {
                    done();
                });
        });
    });

    describe('Update post', () => {
        it('Should login before update post.', (done) => {
            agent
                .post('/api/auth/login')
                .send({
                    email: 'test_mocha@test',
                    password: 'test11'
                })
                .end(() => {
                    done();
                });
        });

        it('Should update post.', (done) => {
            agent
                .put(`/api/posts/${postId}`)
                .send({
                    title: 'Test title (mocha tests).',
                    body: 'Test body (mocha tests).'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Should updated post contain fields.', (done) => {
            PostModel
                .findOne({
                    _id: postId
                }, (err, post) => {
                    expect(err).to.be.null;
                    post.title.should.be.eq('Test title (mocha tests).');
                    post.body.should.be.eq('Test body (mocha tests).');
                    done();
                });
        });

        it('Should logout after update post.', (done) => {
            agent
                .post('/api/auth/logout')
                .end(() => {
                    done();
                });
        });
    });

    describe('Get one post', () => {
        it('Should get error for not exists post.', (done) => {
            agent
                .get(`/api/posts/4g4g34g34g34g3232`)
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.not.have.status(200);
                    done();
                });
        });

        it('Should success get one post.', (done) => {
            agent
                .get(`/api/posts/${postId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(err).to.be.null;
                    expect(res.body).to.be.an('object');
                    ObjectId.isValid(res.body._id).should.to.be.eq(true);
                    expect(res.body.comments).to.be.an('array');
                    done();
                });
        });
    });

    describe('Delete post', () => {
        it('Should login before delete post.', (done) => {
            agent
                .post('/api/auth/login')
                .send({
                    email: 'test_mocha@test',
                    password: 'test11'
                })
                .end(() => {
                    done();
                });
        });

        it('Should delete post.', (done) => {
            agent
                .delete(`/api/posts/${postId}`)
                .end((err, res) => {
                    res.should.have.status(200);

                    PostModel
                        .findOne({
                            _id: new ObjectId(postId)
                        })
                        .exec((err, post) => {
                            expect(err).to.be.null;
                            expect(post).to.be.null;
                        });
                    done();
                });
        });

        it('Should logout after update post.', (done) => {
            agent
                .post('/api/auth/logout')
                .end(() => {
                    done();
                });
        });
    });

});