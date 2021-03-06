var constants = require('../lib/constants');
var path = require('path');

exports.isPositiveInt = function(n){
    return n % 1 === 0 && n > 0;
};

exports.getNbOfPages = function(value) {

    var nbOfPages = Math.floor(value / constants.SITE_PATIENTS_PERPAGE);

    if(value % constants.SITE_PATIENTS_PERPAGE){
        nbOfPages++;
    }

    return nbOfPages;
};

exports.convertEstomatoDateToJSDate = function(date) {

	// EstomatoWeb date has a bad format that is hard to convert
	// E.g.: "31/ 5 /1985"

	var regexYear = /\d{4}/;
	var regexMonth = /\/(.*?)\//;
	var regexDay = /\d+(?=\/)/;

	var year = regexYear.exec(date);
	var month = regexMonth.exec(date)[1].trim();
	var day = regexDay.exec(date);

	return new Date(year + '-' + month + '-' + day);
};

exports.getYearOfDiagnosis = function(reg) {

    var year = reg.substring(0, 2);

    if (year > 70) {
        return new Date('19' + year + '-01-01');
    }
    else {
        return new Date('20' + year + '-01-01');
    }
};

exports.getDateDiff = function(date1, date2) {

    var diff = date2.getFullYear() - date1.getFullYear();
    var m = date2.getMonth() - date1.getMonth();
    if (m < 0 || (m === 0 && date2.getDate() < date1.getDate())) {
        diff--;
    }

    return diff;
};

exports.calculatePercentage = function(current, total) {

    if(current >= total) {
        return undefined;
    }

    return (current/total)*100;
};

var loginFailed = undefined;
var nbOfPatients = 0;
var percentage = 0;

exports.setLoginFailed = function(val) {
    loginFailed = val;
};

exports.getLoginFailed = function() {
    return loginFailed;
};

exports.setNbOfPatients = function(val) {
    nbOfPatients = val;
};

exports.getNbOfPatients = function() {
    return nbOfPatients;
};

exports.setPercentage = function(val) {
    percentage = val;
};

exports.getPercentage = function() {
    return percentage;
};

exports.getFullPath = function(fileName) {
  return path.resolve(__dirname, '../', fileName);
}
