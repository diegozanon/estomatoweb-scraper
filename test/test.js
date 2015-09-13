var expect = require('chai').expect;
var sinon = require('sinon');
var scrap = require('../lib/scrap');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

describe('scrap', function() {

    describe('#start()', function() {

        it('should validate loginData', function() {

            var errorMsg = constants.MSG_ERROR_LOGINDATA;

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

        it('should execute each scrap module once', function(done) {

            var loginData = {
                email: 'email',
                password: 'password'
            };

            var login = { connect: function(ignore, callback) { callback(null, ignore); } };
            var pageNavigator = { nav: function(ignore, callback) { callback(null, ignore, ignore); } };
            var targetData = { extract: function(ignore, ignore2, callback) { callback(null); } };
            var writer = { write: function(callback) { callback(null); } };

            var scrapModules = {
                login: login,
                pageNavigator: pageNavigator,
                targetData: targetData,
                writer: writer
            };

            sinon.spy(login, 'connect');
            sinon.spy(pageNavigator, 'nav');
            sinon.spy(targetData, 'extract');
            sinon.spy(writer, 'write');

            scrap.start(loginData, scrapModules, function(err){
                if (err) throw err;

                var calledEveryoneOnce =
                    login.connect.calledOnce &&
                    pageNavigator.nav.calledOnce &&
                    targetData.extract.calledOnce &&
                    writer.write.calledOnce;

                expect(calledEveryoneOnce).equal(true);
                done();
            });
        });
    });
});

describe('utils', function() {

    describe('#isPositiveInt()', function() {

        it('should check if is positive int', function() {

            var testsTrue = [1, 15, '32'];

            testsTrue.forEach(function(test){
                expect(utils.isPositiveInt(test)).equal(true);
            });

            var testsFalse = [0, -1, '0', '-7', 3.14, undefined, '', 'test1'];

            testsFalse.forEach(function(test){
                expect(utils.isPositiveInt(test)).equal(false);
            });
        });
    });

    describe('#getNbOfPages()', function() {

        it('should return the number of pages', function() {

            // Currently, the website uses SITE_PATIENTS_PERPAGE = 15
            var tests = [
                { value:  0, pages: 0},
                { value:  1, pages: 1},
                { value: 14, pages: 1},
                { value: 15, pages: 1},
                { value: 16, pages: 2},
                { value: 47, pages: 4}
            ];

            tests.forEach(function(test){
                expect(utils.getNbOfPages(test.value)).equal(test.pages);
            });
        });
    });
});
