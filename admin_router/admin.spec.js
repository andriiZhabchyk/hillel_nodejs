'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should();

const app = require('app');

const UserModel = require('router/user/user.model');

chai.use(chaiHttp);

xdescribe('Admin tests', () => {
    before(() => {
        UserModel
            .create({
                username: 'admin',
                password: 'admin',
                email: 'admin@blog.com',
                role: ['admin']
            }, (err, res) => {})
    });

    it('Should register in system', (done) => {
        chai.request(app)
            .post('/api/auth/register')
            .send({
                username: 'Test User',
                email: 'test_mocha@test.com',
                password: 'test11'
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});