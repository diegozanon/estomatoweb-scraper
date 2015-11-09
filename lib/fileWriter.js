var fs = require('fs');
var getDirName = require('path').dirname;
var mkdirp = require('mkdirp');
var constants = require('../lib/constants');

function writeFile (path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    fs.writeFile(path, contents, cb);
  });
}

exports.write = function(data, callback) {

    var dataToWrite = '';

    dataToWrite += constants.FILE_HEADER;

    data.forEach(function(jsonData){
        var keys = Object.keys(jsonData);

        keys.forEach(function(key){
            var value = jsonData[key];

            if(!value) {
                value = '';
            }

            value = value.toString().trim();
            value = value.replace(/\s\s+/g, ' '); // remove long groups of whitespaces
            value = value.replace(';', '.');
            value = value.replace(/(\r\n|\n|\r)/gm, ' '); // remove line breaks

            dataToWrite += value + ';';
        });

        dataToWrite += '\n';
    });

    writeFile(constants.FILE_NAME, dataToWrite, callback);
}