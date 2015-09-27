var constants = require('../lib/constants');

exports.isPositiveInt = function(n){
    return n % 1 === 0 && n > 0;
}

exports.getNbOfPages = function(value) {

    var nbOfPages = Math.floor(value / constants.SITE_PATIENTS_PERPAGE);

    if(value % constants.SITE_PATIENTS_PERPAGE){
        nbOfPages++;
    }

    return nbOfPages;
}

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
}


exports.getAge = function(date, today) {

	if(typeof today === 'undefined') {
		today = new Date();
	}

    var diff = today.getFullYear() - date.getFullYear();
    var m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        diff--;
    }

    return diff;
}