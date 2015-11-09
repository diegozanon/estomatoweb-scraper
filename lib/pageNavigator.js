var async = require('async');
var cheerio = require('cheerio');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

exports.nav = function(request, mainCallback) {

    async.waterfall([
        function(callback){
            getNumberOfPatients(request, callback);
        },
        function(request, nbOfPatients, callback){
            getPatientIds(request, nbOfPatients, callback);
        }
    ], function (err, request, patientIds) {
        mainCallback(err, request, patientIds);
    });
}

function getNumberOfPatients(request, callback) {

    var homeUrl = constants.URL_HOSTNAME + constants.URL_HOME;
    request.get(homeUrl, function(err, response, body){
        if(err) throw err;

        var $ = cheerio.load(body);
        var hasNbOfPatients;

        $(constants.HTML_HOME_SEARCHFORM).filter(function(){
            var data = $(this);
            var value = data.find('strong').first().text();

            if(!utils.isPositiveInt(value))
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

function getPatientIds(request, nbOfPatients, mainCallback) {

    var nbOfPages = utils.getNbOfPages(nbOfPatients);
    console.log(constants.MSG_DEBUG_NUMBEROFPAGES.replace("{0}", nbOfPages));

    var n = 1;
    var pageIds = Array.apply(0, Array(nbOfPages)).map(function() { return n++; }); // sequence of page numbers
    var patientIds = [];

    async.eachSeries(pageIds,
        function(pageId, callback){

            var searchUrl = constants.URL_HOSTNAME + constants.URL_SEARCH.replace("{0}", pageId);
            request.get(searchUrl, function(err, response, body){
                if(err) throw err;

                var $ = cheerio.load(body);

                $(constants.HTML_SEARCH_PATIENTID).attr("href", function(i, href){

                    var patientId = href.replace(constants.HTML_SEARCH_URLPATIENTPREFIX, '');
                    patientIds.push(patientId);
                });

                callback(null);
            });
        },
        function(err){
            mainCallback(err, request, patientIds);
        }
    );
}

