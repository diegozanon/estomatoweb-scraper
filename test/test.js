var scrap = require('../lib/scrap');
var constants = require('../lib/constants');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('scrap', function() {

    describe('#start()', function() {

        it('should require two valid arguments', function() {

            var errorMsg = constants.MSGS_INVALID_ARGS;

            var arg1;
            var arg2 = '';
            var login = function() {};
            var callback = function(err) {};

            expect(function() {
                scrap.start(arg1, arg2, login, callback)
            }).to.throw(errorMsg);
        });

        it('should require and execute the login function', function(done) {

            var email = 'email';
            var password = 'password';
            var login = sinon.spy();

            scrap.start(email, password, login, function(err){
                if (err) throw err;

                expect(login.calledOnce).equal(true);
                done();
            })
        });
    });
});