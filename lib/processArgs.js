var constants = require('../lib/constants');

exports.validate = function() {

    if(process.argv.length != 4) { // Usage: node app.js email password

        throw constants.MSG_ERROR_ARGS;
    }
};

exports.retrieveLoginData = function() {

    var loginData = {
        email: process.argv[2],
        password: process.argv[3]
    };

    return loginData;
};


