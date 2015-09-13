var async = require('async');
var constants = require('../lib/constants');

exports.start = function(loginData, scrapModules, mainCallback) {

    if(loginData.email && loginData.password) { // true if both variables are not empty

        async.waterfall([
            function(callback){
                scrapModules.login.connect(loginData, callback);
            },
            function(request, callback){
                scrapModules.pageNavigator.nav(request, callback);
            },
            function(request, ids, callback){
                scrapModules.targetData.extract(request, ids, callback);
            },
            function(data, callback){
                scrapModules.writer.write(data, callback);
            }
        ], function (err) {
            mainCallback(err);
        });
    }
    else {
        throw constants.MSG_ERROR_LOGINDATA;
    }
}