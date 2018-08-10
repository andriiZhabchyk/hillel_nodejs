'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    expect = chai.expect;

const app = require('app');

const UserModel = require('router/user/user.model');

chai.use(chaiHttp);

describe('Auth system.', () => {
    const agent = chai.request.agent(app);

    before(() => {
        UserModel
            .deleteMany({})
            .exec((err, res) => {});
    });

    it('Should register in system', (done) => {
        agent
            .post('/api/auth/register')
            .send({
                username: 'Test User',
                email: 'test_mocha@test',
                password: 'test11'
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.redirect;
                return agent
                    .post('/api/auth/logout')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    it('Should login into the system after registration.', (done) => {
        agent
            .post('/api/auth/login')
            .send({
                email: 'test_mocha@test',
                password: 'test11'
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.redirect;
                return agent
                    .post('/api/auth/logout')
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
    });
});