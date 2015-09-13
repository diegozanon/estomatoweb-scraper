var fs = require('fs');
var async = require('async');
var constants = require('../lib/constants');

exports.write = function(data, mainCallback) {

    async.series([
        function(callback) {

            //TODO: fill FILE_HEADER
            writeToFile(constants.FILE_HEADER, callback);
        },
        function(callback) {
            writeLines(data, callback);
        }
    ], function(err){
            mainCallback(err);
    });
}

function writeLines(data, mainCallback){

    async.eachSeries(data,
        function(d, callback){
            var text = '';
            // TODO: fill text
            writeToFile(text, callback);
        },
        function(err){
            mainCallback(err);
        }
    );
}

function writeToFile(text, callback){

    // TODO: create file if not exist
    fs.appendFile(constants.FILE_NAME, text, function(err) {
        if(err) throw err;
        callback();
    });
}