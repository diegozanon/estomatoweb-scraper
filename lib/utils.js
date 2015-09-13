var constants = require('../lib/constants');

exports.isPositiveInt = function(n){
    return n % 1 === 0 && n > 0;
}

exports.getNbOfPages = function(value){

    var nbOfPages = Math.floor(value / constants.SITE_PATIENTS_PERPAGE);

    if(value % constants.SITE_PATIENTS_PERPAGE){
        nbOfPages++;
    }

    return nbOfPages;
}