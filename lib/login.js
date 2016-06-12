var request = require('request');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

request = request.defaults( {jar: true} ); // set a global cookie

exports.connect = function(loginData, callback) {

    var data = {
        url: constants.URL_HOSTNAME + constants.URL_LOGIN,
        form: 'email=' + loginData.email + '&senha=' + loginData.password
    };

    request.post(data, function(err, response, body){
        if(err || response.statusCode !== 302) { // 302 = redirect = login accepted
          utils.setLoginFailed(true);
          throw err;
        }

        utils.setLoginFailed(false);
        callback(null, request);
    });
};
