const { expect } = require('chai');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function() {

    it('should throw an error if no authorization header is present', function() {
        const req = {
            get: function(headerName) {
                return null;
            }
        };
        
        const res = {};
        
        expect(authMiddleware.bind(this, req, res, () => {})).to.throw('Not authenticated.');
    });

    it('should throw an error if the authorization header is only one string', function() {

        const req = {
            get: function(headerName) {
                return 'xyz';
            }
        };
        
        const res = {};
        expect(authMiddleware.bind(this, req, res, () => {})).to.throw();

    });

    it('should yield a userid after decoding the token', function() {
        
        const req = {
            get: function(headerName) {
                return 'Bearer adsadsadsadsadasdsa';
            }
        };

        sinon.stub(jwt, 'verify');

        jwt.verify.returns({userId: 'abc'});

        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;

        jwt.verify.restore();

    });

    it('should throw an error if the token cannot be verified', function() {
        
        const req = {
            get: function(headerName) {
                return 'Bearer xyz';
            }
        };
        
        const res = {};
        expect(authMiddleware.bind(this, req, res, () => {})).to.throw();

    });

});

