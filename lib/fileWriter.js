var fs = require('fs');
var constants = require('../lib/constants');

exports.write = function(data, callback) {

    var dataToWrite = '';

    dataToWrite += constants.FILE_HEADER;

    data.forEach(function(jsonData){
        var keys = Object.keys(jsonData);

        keys.forEach(function(key){
            var value = jsonData[key];
            value = value.replace(';', '.');
            dataToWrite += value + ';';
        });

        dataToWrite += '\n';
    });

    fs.writeFile(constants.FILE_NAME, dataToWrite, { flags: 'w' }, function (err) {
        if (err) throw err;
        callback();
    });
}