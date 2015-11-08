var common = require("../common");
var expect = common.expect;
var processArgs = common.processArgs;
var constants = common.constants;

describe('processArgs', function() {

    describe('#validate()', function() {

        it('should check if the number of arguments is correct', function() {

            var tests = [
                { args : ['node', 'app.js'], valid : false},
                { args : ['node', 'app.js', 'arg'], valid : false },
                { args : ['node', 'app.js', 'arg', 'arg'], valid : true },
                { args : ['node', 'app.js', 'arg', 'arg', 'arg'], valid : false }
            ];

            tests.forEach(function(test){
                process.argv = test.args;

                if (test.valid) {
                    processArgs.validate(); // should run without exceptions
                }
                else {
                    expect(processArgs.validate).to.throw(constants.MSG_ERROR_ARGS);
                }
            });
        });
    });

    describe('#retrieveLoginData()', function() {

        it('should retrieve the arguments correctly', function() {

            var arg1 = 'test-email';
            var arg2 = 'test-password';
            process.argv = ['node', 'app.js', arg1, arg2];

            var loginData = processArgs.retrieveLoginData();

            expect(loginData.email).to.equal(arg1);
            expect(loginData.password).to.equal(arg2);
        });
    });
});