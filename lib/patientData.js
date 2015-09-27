var async = require('async');
var cheerio = require('cheerio');
var constants = require('../lib/constants');
var utils = require('../lib/utils');

exports.extract = function(request, patientIds, mainCallback) {

    var patientData = [];

    // testing
    patientIds = ['1959'];

    async.eachSeries(patientIds,
        function(patientId, callback){

            var patientUrl = constants.URL_HOSTNAME + constants.URL_PATIENT.replace("{0}", patientId);
            request.get(patientUrl, function(err, response, body){
                if(err) throw err;

                var patientCompleteDataUrl = constants.URL_HOSTNAME + constants.URL_PATIENT_COMPLETE;
                request.get(patientCompleteDataUrl, function(err, response, body){
                    if(err) throw err;

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
}

function getPatientData($){

    var patientData;

    patientData = {
        name:           getField($, constants.HTML_PATIENT_NAME),
        email:          getField($, constants.HTML_PATIENT_EMAIL),
        registration:   getField($, constants.HTML_PATIENT_REGISTRATION),
        dob:            getField($, constants.HTML_PATIENT_DOB),
        age:            getAge($, constants.HTML_PATIENT_DOB),
        race:           getField($, constants.HTML_PATIENT_RACE),
        genre:          getField($, constants.HTML_PATIENT_GENRE),
        bornIn:         getField($, constants.HTML_PATIENT_BORNIN),
        profession:     getField($, constants.HTML_PATIENT_PROFESSION),
        cpf:            getField($, constants.HTML_PATIENT_CPF),
        respName:       getField($, constants.HTML_PATIENT_RESPNAME),
        kinship:        getField($, constants.HTML_PATIENT_KINSHIP),
        address:        getField($, constants.HTML_PATIENT_ADDRESS),
        neighborhood:   getField($, constants.HTML_PATIENT_NEIGHBORHOOD),
        city:           getCity($),
        state:          getState($),
        cep:            getField($, constants.HTML_PATIENT_CEP),
        firstTel:       getField($, constants.HTML_PATIENT_FIRSTTEL),
        secTel:         getField($, constants.HTML_PATIENT_SECTEL),
        thirdTel:       getField($, constants.HTML_PATIENT_THIRDTEL),
        directedBy:     getField($, constants.HTML_PATIENT_DIRECTEDBY),
        professor:      getField($, constants.HTML_PATIENT_PROFESSOR),
        complaint:      getField($, constants.HTML_PATIENT_COMPLAINT),
        illnessHistory: getField($, constants.HTML_PATIENT_ILLNESSHISTORY),
        duration:       getField($, constants.HTML_PATIENT_DURATION)
    }

    return patientData;
}

function getField($, selector){

    var field;
    $(selector).filter(function(){
        field = $(this).parent().next().text();
    });

    return field;
}

function getAge($, selector){

    var dateOfBirth = getField($, selector);
    var date = utils.convertEstomatoDateToJSDate(dateOfBirth);
    return utils.getAge(date);
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