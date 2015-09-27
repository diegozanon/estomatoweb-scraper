var request = require('request');
var constants = require('../lib/constants');

request = request.defaults( {jar: true} ); // set a global cookie

exports.connect = function(loginData, callback) {

    var data = {
        url: constants.URL_HOSTNAME + constants.URL_LOGIN,
        form: 'email=' + loginData.email + '&senha=' + loginData.password
    };

    request.post(data, function(err, response, body){
        if(err) throw err;

        callback(null, request);
    });
};