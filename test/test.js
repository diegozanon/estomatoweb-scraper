var scrap = require('../lib/scrap');
var constants = require('../lib/constants');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('scrap', function() {

    describe('#start()', function() {

        it('should validate loginData', function() {

            var errorMsg = constants.MSGS_INVALID_LOGINDATA;

            var loginDataTests = [
                {},
                { email: 'email' },
                { password: 'password' },
                { email: '', password: 'password' },
                { email: 'email', password: '' }
            ];

            var scrapModules = sinon.spy();
            var callback = function() {};

            loginDataTests.forEach(function(loginData){
                expect(function() {
                    scrap.start(loginData, scrapModules, callback);
                }).to.throw(errorMsg);
            });
        });

        it('should execute the scrapModules once', function(done) {

            var loginData = {
                email: 'email',
                password: 'password'
            };

            var scrapModules = sinon.spy();

            scrap.start(loginData, scrapModules, function(err){
                if (err) throw err;

                expect(scrapModules.calledOnce).equal(true);
                done();
            })
        });
    });
});