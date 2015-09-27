var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-datetime'));
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
            var targetData = { extract: function(ignore, ignore2, callback) { callback(null, ignore); } };
            var writer = { write: function(ignore, callback) { callback(null); } };

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
                var isPositive = utils.isPositiveInt(test);
                var expected = true;
                expect(isPositive).equal(expected);
            });

            var testsFalse = [0, -1, '0', '-7', 3.14, undefined, '', 'test1'];

            testsFalse.forEach(function(test){
                var isPositive = utils.isPositiveInt(test);
                var expected = false;
                expect(isPositive).equal(expected);
            });
        });
    });

    describe('#getNbOfPages()', function() {

        it('should return the number of pages', function() {

            // Currently, the website uses SITE_PATIENTS_PERPAGE = 15
            var tests = [
                { value:  0, expected: 0},
                { value:  1, expected: 1},
                { value: 14, expected: 1},
                { value: 15, expected: 1},
                { value: 16, expected: 2},
                { value: 47, expected: 4}
            ];

            tests.forEach(function(test){
                var nbOfPages = utils.getNbOfPages(test.value);
                expect(nbOfPages).equal(test.expected);
            });
        });
    });

    describe('#convertEstomatoDateToJSDate()', function() {

        it('should convert EstomatoWeb date to JavaScript date', function() {

            var tests = [
                { value: '31/ 5 /1985', expected: new Date('1985-5-31') },
                { value: '31/ 12 /1985', expected: new Date('1985-12-31') },
                { value: '5/ 5 /1985', expected: new Date('1985-5-5') },
                { value: '5/ 12 /1985', expected: new Date('1985-12-5') },
                { value: '31/ 5 /1900', expected: new Date('1900-5-31') }
            ];

            tests.forEach(function(test){
                var date = utils.convertEstomatoDateToJSDate(test.value);
                expect(date).to.equalDate(test.expected);
            });
        });
    });

    describe('#getAge()', function() {

        it('should return the difference in years', function() {

            var tests = [
                { date1: new Date('1954-12-1'), date2: new Date('1982-3-13'), expected: 27},
                { date1: new Date('1954-3-1'), date2: new Date('1982-3-13'), expected: 28},
                { date1: new Date('1954-3-12'), date2: new Date('1982-3-13'), expected: 28},
                { date1: new Date('1954-3-13'), date2: new Date('1982-3-13'), expected: 28},
                { date1: new Date('1954-3-14'), date2: new Date('1982-3-13'), expected: 27}
            ];

            tests.forEach(function(test){
                var diff = utils.getAge(test.date1, test.date2);
                expect(diff).equal(test.expected);
            });
        });
    });
});
