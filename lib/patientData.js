var async = require('async');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var dateFormat = require('dateformat');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

exports.extract = function(request, patientIds, mainCallback) {

    var patientData = [];

    console.log('Fetching data...');

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
                    patientData.push(data);

                    callback(null);
                });
            });
        },
        function(err){
            mainCallback(err, patientData);
        }
    );
};

function getPatientData($) {

    var patientData;

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
        externalLesion:     getLesionInfo($, constants.HTML_FIELD_EXTERNAL_LESION, constants.HTML_FIELD_LYMPH_NODES),
        internalLesion:     getLesionInfo($, constants.HTML_FIELD_INTERNAL_LESION, constants.HTML_FIELD_LOCALIZATION),
        internalLesionLoc:  getLesionInfo($, constants.HTML_FIELD_LOCALIZATION, constants.HTML_FIELD_REPORT),
        clinicalDiagnosis:  todo($, constants.HTML_PATIENT_CLINICAL_DIAGNOSIS),
        additionalExams:    todo($, constants.HTML_PATIENT_ADDITIONAL_EXAMS),
        finalDiagnosis:     todo($, constants.HTML_PATIENT_FINAL_DIAGNOSIS)
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

function getGrandfatherSiblingField($, selector) {

    var field;
    $(selector).filter(function(){
        field = $(this).parent().parent().next().children().first().next().text();
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
    return value.substr(0, index).trim();
}

function getState($, cityId) {

    var value = getSiblingField($, cityId);
    var index = value.indexOf(constants.HTML_FIELD_STATE);
    var partial =  value.substr(index);
    return partial.replace(constants.HTML_FIELD_STATE, '').trim();
}

function getHabit($, selector, replaceField) {

    var value = getCurrentField($, selector);

    if(value) {
        return value.replace(replaceField, '').trim().toLowerCase();
    }
    else {
        return constants.PT_NO;
    }
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
        return constants.PT_NO;
    }
}

function getStoppedSmoking($, smokeId) {

    return getOldHabit($, smokeId);
}

function getStoppedDrinking($, drinkId) {

    return getOldHabit($, drinkId);
}

function getLesionInfo($, limiter1, limiter2) {

    var value = getParentField($, constants.HTML_PATIENT_EXTERNAL_LESION); // works for INTERNAL lesion too
    var index = value.indexOf(limiter1);
    var partial =  value.substr(index);
    var partial2 = partial.replace(limiter1, '').trim();
    var index2 = partial2.indexOf(limiter2);
    return partial2.substr(0, index2).trim();
}

function todo($, id) {
    var x = getGrandfatherSiblingField($, id);
    console.log(x);
    return '';
}