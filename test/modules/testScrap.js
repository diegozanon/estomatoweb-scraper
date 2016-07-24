var common = require("../common");
var expect = common.expect;
var sinon = common.sinon;
var scrap = common.scrap;
var constants = common.constants;

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
            var targetData = { extract: function(ignore, ignore2, ignore3, callback) { callback(null, ignore); } };
            var writer = { write: function(ignore, ignore2, callback) { callback(null); } };

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
