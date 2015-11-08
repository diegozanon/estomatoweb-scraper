var async = require('async');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var dateFormat = require('dateformat');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

exports.extract = function(request, patientIds, mainCallback) {

    var patientData = [];

    async.eachSeries(patientIds,
        function(patientId, callback){

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

function getPatientData($){

    var patientData;

    patientData = {
        name:               getField($, constants.HTML_PATIENT_NAME),
        registration:       getField($, constants.HTML_PATIENT_REGISTRATION),
        dob:                getDOB($, constants.HTML_PATIENT_DOB),
        ageWhenDiagnosed:   getAgeWhenDiagnosed($, constants.HTML_PATIENT_DOB, constants.HTML_PATIENT_REGISTRATION),
        genre:              getField($, constants.HTML_PATIENT_GENRE),
        neighborhood:       getField($, constants.HTML_PATIENT_NEIGHBORHOOD),
        city:               todo($),
        state:              todo($),
        smoke:              todo($, constants.HTML_PATIENT_SMOKE),
        drink:              todo($, constants.HTML_PATIENT_DRINK),
        externalLesion:     todo($, constants.HTML_PATIENT_EXTERNAL_LESION),
        intraLesion:        todo($, constants.HTML_PATIENT_INTERNAL_LESION),
        intraLesionLoc:     todo($, constants.HTML_PATIENT_INTERNAL_LESION_LOC),
        clinicalDiagnosis:  todo($, constants.HTML_PATIENT_CLINICAL_DIAGNOSIS),
        additionalExams:    todo($, constants.HTML_PATIENT_ADDITIONAL_EXAMS),
        finalDiagnosis:     todo($, constants.HTML_PATIENT_FINAL_DIAGNOSIS)
    };

    return patientData;
}

function getField($, selector){

    var field;
    $(selector).filter(function(){
        field = $(this).parent().next().text();
    });

    return field;
}

function getDOB($, dob){

    var estomatoDate = getField($, dob);
    var dateOfBirth = utils.convertEstomatoDateToJSDate(estomatoDate);
    return dateFormat(dateOfBirth, "dd/mm/yyyy");
}

/**
 * The age should be calculated with the date that the patient started the treatment in this clinic.
 * The first two numbers of the registration is the year to use.
 */
function getAgeWhenDiagnosed($, dob, registration){

    var estomatoDate = getField($, dob);
    var dateOfBirth = utils.convertEstomatoDateToJSDate(estomatoDate);

    var regs = getField($, registration);
    var yearOfDiagnosis = utils.getYearOfDiagnosis(regs);

    return utils.getDateDiff(dateOfBirth, yearOfDiagnosis);
}

function getCity($){

    return '';

    /* TODO: fix. Not working yet
    var value = getField($, constants.HTML_PATIENT_CITY);
    var index = value.indexOf(constants.HTML_PATIENT_STATE);
    return value.substring(0, index).trim();
    */
}

function getState($, selector){

    return '';

    /* TODO: fix. Not working yet
    var value = getField($, constants.HTML_PATIENT_CITY);
    var index = value.indexOf(constants.HTML_PATIENT_STATE);
    return value.substring(index).replace(constants.HTML_PATIENT_STATE, '').trim();
    */
}

function getSmoke($, selector){

    return '';

    /* TODO: fix. Not working yet
     */
}

function getDrink($, selector){

    return '';

    /* TODO: fix. Not working yet
     */
}

function todo() {
    return '';
}