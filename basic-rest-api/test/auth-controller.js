const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller', function () {

    before(function(done) {
        console.log('This will be executed before the tests!');
        done();
    });

    after(function(done) {
        console.log('This will be executed after the tests!');
        done();
    });


    it('should throw an error with code 500 if accessing the database fails', function (done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester123'
            }
        };

        AuthController.login(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });


        User.findOne.restore();
    });

    it('should send a respose with a valid user status for an existing user', function (done) {

        sinon.stub(User, 'findById');

        const req = {
            params: {
                userId: 'some user id'
            }
        };

        const json = sinon.spy();

        const res = {
            status: function (statusCode) {
                expect(statusCode).to.equal(200);
                return {
                    json
                };
            }
        };

        User.findById.resolves({
            status: 'some status'
        });

        AuthController.getUserStatus(req, res, () => {})
        .then(() => {
            expect(json.calledOnce).to.equal(true);
            expect(json.firstCall.args[0]).to.deep.equal({
                status: 'some status'
            });

            User.findById.restore();
            done();
        })
        .catch(done);

    });



});