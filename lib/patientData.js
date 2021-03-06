var async = require('async');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var dateFormat = require('dateformat');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

exports.extract = function(request, patientIds, options, mainCallback) {

    var patientData = [];

    console.log('0%');

    var nbOfPatients = patientIds.length;
    var n = 0;

    async.eachSeries(patientIds,
        function(patientId, callback) {

            var patientUrl = constants.URL_HOSTNAME + constants.URL_PATIENT.replace("{0}", patientId);
            request.get(patientUrl, function(err, response, body){
                if(err) throw err;

                var patientCompleteDataUrl = constants.URL_HOSTNAME + constants.URL_PATIENT_COMPLETE;

                var data = {
                    url: patientCompleteDataUrl,
                    encoding: null
                };

                request.get(data, function(err, response, body){
                    if(err) throw err;

                    body = iconv.decode(new Buffer(body), "ISO-8859-1");
                    var $ = cheerio.load(body);

                    var data = getPatientData($);
                    data = removeNotSelectedOptions(data, options);
                    patientData.push(data);

                    n++;
                    var percentage = utils.calculatePercentage(n, nbOfPatients);
                    if(percentage) {
                        console.log(percentage.toFixed(0) + '%');
                    }

                    utils.setPercentage(percentage);

                    callback(null);
                });
            });
        },
        function(err){
            console.log('100%');
            mainCallback(err, patientData);
        }
    );
};

function getPatientData($) {

    var patientData;

    if(!checkIfValid($)) {
        return getEmptyData($);
    }

    patientData = {
        name:               getSiblingField($, constants.HTML_PATIENT_NAME),
        registration:       getSiblingField($, constants.HTML_PATIENT_REGISTRATION),
        dob:                getDOB($, constants.HTML_PATIENT_DOB),
        ageWhenDiagnosed:   getAgeWhenDiagnosed($, constants.HTML_PATIENT_DOB, constants.HTML_PATIENT_REGISTRATION),
        genre:              getSiblingField($, constants.HTML_PATIENT_GENRE),
        neighborhood:       getSiblingField($, constants.HTML_PATIENT_NEIGHBORHOOD),
        city:               getCity($, constants.HTML_PATIENT_CITY),
        state:              getState($, constants.HTML_PATIENT_CITY),
        smoke:              getSmoke($, constants.HTML_PATIENT_SMOKE),
        stoppedSmoking:     getStoppedSmoking($, constants.HTML_PATIENT_STOPPED_SMOKING),
        drink:              getDrink($, constants.HTML_PATIENT_DRINK),
        stoppedDrinking:    getStoppedDrinking($, constants.HTML_PATIENT_STOPPED_DRINKING),
        externalLesion:     getLesionInfo($, constants.HTML_PATIENT_EXTERNAL_LESION, constants.HTML_FIELD_EXTERNAL_LESION, constants.HTML_FIELD_LYMPH_NODES),
        internalLesion:     getLesionInfo($, constants.HTML_PATIENT_INTERNAL_LESION, constants.HTML_FIELD_INTERNAL_LESION, constants.HTML_FIELD_LOCALIZATION),
        internalLesionLoc:  getLesionInfo($, constants.HTML_PATIENT_INTERNAL_LESION_LOC, constants.HTML_FIELD_LOCALIZATION, constants.HTML_FIELD_REPORT),
        clinicalDiagnosis:  getDiagnosis($, constants.HTML_PATIENT_CLINICAL_DIAGNOSIS),
        additionalExams:    getAdditionalExams($, constants.HTML_PATIENT_ADDITIONAL_EXAMS),
        finalDiagnosis:     getFinalDiagnosis($, constants.HTML_PATIENT_FINAL_DIAGNOSIS)
    };

    if (patientData.stoppedSmoking) {
        patientData.smoke = constants.PT_NO;
    }

    if (patientData.stoppedDrinking) {
        patientData.drink = constants.PT_NO;
    }

    return patientData;
}

function removeNotSelectedOptions(data, options) {

  if(!options)
    return data;

  var keys = Object.keys(options);

  keys.forEach(key => {
    if (!options[key])
      delete data[key];
  });

  return data;
}

function checkIfValid($) {

    var dob = getSiblingField($, constants.HTML_PATIENT_DOB);
    return !(dob == "/  / ");
}

function getEmptyData($) {

    var patientData = {
        name:               getSiblingField($, constants.HTML_PATIENT_NAME),
        registration:       '',
        dob:                '',
        ageWhenDiagnosed:   '',
        genre:              '',
        neighborhood:       '',
        city:               '',
        state:              '',
        smoke:              '',
        stoppedSmoking:     '',
        drink:              '',
        stoppedDrinking:    '',
        externalLesion:     '',
        internalLesion:     '',
        internalLesionLoc:  '',
        clinicalDiagnosis:  '',
        additionalExams:    '',
        finalDiagnosis:     ''
    };

    return patientData;
}

function getCurrentField($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).text();
    });

    return field;
}

function getSiblingField($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).parent().next().text();
    });

    return field;
}

function getParentField($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).parent().text();
    });

    return field;
}

function getDOB($, dobId) {

    var estomatoDate = getSiblingField($, dobId);
    var dateOfBirth = utils.convertEstomatoDateToJSDate(estomatoDate);
    return dateFormat(dateOfBirth, constants.DATE_FORMAT);
}

/**
 * The age should be calculated with the date that the patient started the treatment in this clinic.
 * The first two numbers of the registration is the year to use.
 */
function getAgeWhenDiagnosed($, dobId, registrationId) {

    var estomatoDate = getSiblingField($, dobId);
    var dateOfBirth = utils.convertEstomatoDateToJSDate(estomatoDate);

    var regs = getSiblingField($, registrationId);
    var yearOfDiagnosis = utils.getYearOfDiagnosis(regs);

    return utils.getDateDiff(dateOfBirth, yearOfDiagnosis);
}

function getCity($, cityId) {

    var value = getSiblingField($, cityId);
    var index = value.indexOf(constants.HTML_FIELD_STATE);
    return value.substr(0, index);
}

function getState($, cityId) {

    var value = getSiblingField($, cityId);
    var index = value.indexOf(constants.HTML_FIELD_STATE);
    var partial =  value.substr(index);
    return partial.replace(constants.HTML_FIELD_STATE, '');
}

function getHabit($, selector, replaceField) {

    var value = getCurrentField($, selector);

    if(value) {
        return value.replace(replaceField, '').toLowerCase();
    }

    return '';
}

function getSmoke($, smokeId) {

    return getHabit($, smokeId, constants.HTML_FIELD_SMOKE);
}

function getDrink($, drinkId) {

    return getHabit($, drinkId, constants.HTML_FIELD_DRINK);
}

function getOldHabit($, selector) {

    var value = getCurrentField($, selector);

    if(value) {
        return constants.PT_YES;
    }
    else {
        return '';
    }
}

function getStoppedSmoking($, smokeId) {

    return getOldHabit($, smokeId);
}

function getStoppedDrinking($, drinkId) {

    return getOldHabit($, drinkId);
}

function getLesionInfo($, selector, limiter1, limiter2) {

    var value = getParentField($, selector);

    if(value) {
        var index = value.indexOf(limiter1);
        var partial =  value.substr(index);
        var partial2 = partial.replace(limiter1, '');
        var index2 = partial2.indexOf(limiter2);
        return partial2.substr(0, index2);
    }
    else {
        return '';
    }
}

function getDiagnosis($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).parent().parent().next().children().first().next().text();
    });

    return field;
}

function getAdditionalExams($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).parent().parent().next().children().first().next().text();
    });

    return field;
}

function getFinalDiagnosis($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).parent().text();
        field = field.replace(constants.HTML_FIELD_FINAL_DIAGNOSIS, '');
    });

    return field;
}
