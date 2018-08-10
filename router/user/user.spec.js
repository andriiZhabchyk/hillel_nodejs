'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    expect = chai.expect;

const app = require('app');

const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

chai.use(chaiHttp);

describe('User management system', () => {
    const agent = chai.request.agent(app);

    it('Should login before use user api.', (done) => {
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

    it('Should get user info.', (done) => {
        agent
            .get('/api/user/current')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                ObjectId.isValid(res.body._id).should.be.eq(true);
                done();
            });
    });

    it('Should get user activity.', (done) => {
        agent
            .get('/api/user/activity')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body.comments).to.be.an('array');
                expect(res.body.posts).to.be.an('array');
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