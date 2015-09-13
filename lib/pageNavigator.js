var async = require('async');
var cheerio = require('cheerio');
var constants = require('../lib/constants');

exports.nav = function(request, mainCallback) {

    async.waterfall([
        function(callback){
            getNumberOfPatients(request, callback);
        },
        function(request, nbOfPatients, callback){
            getPatientIds(request, nbOfPatients, callback);
        }
    ], function (err) {
        mainCallback(err);
    });
};

function getNumberOfPatients(request, callback) {

    var homeUrl = constants.URL_HOSTNAME + constants.URL_HOME;
    request.get(homeUrl, function(err, response, body){
        if(err) throw err;

        var $ = cheerio.load(body);
        var hasNbOfPatients;

        $(constants.HTML_HOME_SEARCHFORM).filter(function(){
            var data = $(this);
            var value = data.find('strong').first().text();

            if(!isInt(value))
                throw constants.MSG_ERROR_NONUMBEROFPATIENTS;

            var nbOfPatients = Number(value);
            console.log(constants.MSG_DEBUG_NUMBEROFPATIENTS.replace("{0}", nbOfPatients));
            hasNbOfPatients = true;

            callback(null, request, nbOfPatients);
        });

        if(!hasNbOfPatients) {
            // if could not find a result in filter, throw an error
            throw constants.MSG_ERROR_NONUMBEROFPATIENTS;
        }
    });
}

function getPatientIds(request, nbOfPatients, callback) {
    callback(null);
}

function isInt(n){
    return n % 1 === 0;
}