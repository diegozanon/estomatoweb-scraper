var async = require('async');
var constants = require('../lib/constants');

exports.start = function(loginData, scrapModules, mainCallback) {

    if(loginData.email && loginData.password) { // true if both variables are not empty

        async.waterfall([
            function(callback){
                console.log("Connecting...");
                scrapModules.login.connect(loginData, callback);
            },
            function(request, callback){
                console.log("Navigating...");
                scrapModules.pageNavigator.nav(request, callback);
            },
            function(request, ids, callback){
                console.log("Extracting...");
                scrapModules.targetData.extract(request, ids, loginData.options, callback);
            },
            function(data, callback){
                console.log("Writing...");
                scrapModules.writer.write(data, loginData.options, callback);
            }
        ], function (err) {
            mainCallback(err);
        });
    }
    else {
        throw constants.MSG_ERROR_LOGINDATA;
    }
}
