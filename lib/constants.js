function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

/**
 * MSGS
 */

define(
    'MSG_ERROR_ARGS',
    'Error: you must provide two valid command line arguments. \nUsage: node app email password'
);

define(
    'MSG_ERROR_LOGINDATA',
    'Error: loginData must have not empty email and password fields.'
);

define(
    'MSG_ERROR_NONUMBEROFPATIENTS',
    'Error: could not retrieve the number of patients.'
);

define(
    'MSG_DEBUG_NUMBEROFPATIENTS',
    'Number of patients: {0}.'
);

define(
    'MSG_DEBUG_NUMBEROFPAGES',
    'Number of pages: {0}.'
);

/**
 * URLS
 */

define(
    'URL_HOSTNAME',
    'http://www.estomatoweb.com.br'
);

define(
    'URL_LOGIN',
    '/login.asp'
);

define(
    'URL_HOME',
    '/home.asp'
);

define(
    'URL_SEARCH',
    '/busca.asp?pag={0}&busca=td'
);

define(
    'URL_PATIENT',
    '/cad_ses.asp?cod_pac={0}'
);

define(
    'URL_PATIENT_COMPLETE',
    '/ficha_completa.asp'
);

/**
 * CONFIGS
 */

define(
    'SITE_PATIENTS_PERPAGE',
    15
);

define(
    'FILE_NAME',
    './tmp/output.csv'
);

define(
    'DATE_FORMAT',
    'dd/mm/yyyy'
);

define(
    'PT_YES',
    'sim'
);

define(
    'PT_NO',
    'não'
);

define(
    'FILE_HEADER',
    'Nome;' +
    'Matrícula;' +
    'Data de Nascimento;' +
    'Idade quando diagnosticado;' +
    'Sexo;' +
    'Bairro;' +
    'Cidade;' +
    'Estado;' +
    'Fuma;' +
    'Parou de fumar;' +
    'Bebe;' +
    'Parou de beber;' +
    'Lesão Extra-bucal;' +
    'Lesão Intra-bucal;' +
    'Localização Lesão Intra-bucal;' +
    'Diagnóstico Clínico;' +
    'Exames Complementares;' +
    'Diagnóstico Final;' +
    '\n'
);

/**
 * HTML SELECTORS
 */

define(
    'HTML_HOME_SEARCHFORM',
    'form[name="form_busca"]'
);

define(
    'HTML_SEARCH_PATIENTID',
    'a[href^="cad_ses.asp?cod_pac="]'
);

define(
    'HTML_SEARCH_URLPATIENTPREFIX',
    'cad_ses.asp?cod_pac='
);

/**
 * HTML PATIENT DATA
 */

define(
    'HTML_PATIENT_NAME',
    'strong:contains("Nome:")'
);

define(
    'HTML_PATIENT_REGISTRATION',
    'strong:contains("Matricula:")'
);

define(
    'HTML_PATIENT_DOB',
    'strong:contains("Data de Nasc.")'
);

define(
    'HTML_PATIENT_GENRE',
    'strong:contains("Sexo:")'
);

define(
    'HTML_PATIENT_NEIGHBORHOOD',
    'strong:contains("Bairro:")'
);

define(
    'HTML_PATIENT_CITY',
    'strong:contains("Cidade:")'
);

define(
    'HTML_PATIENT_STATE',
    'strong:contains("Estado:")'
);

define(
    'HTML_PATIENT_SMOKE',
    'strong:contains("Fuma:")'
);

define(
    'HTML_PATIENT_STOPPED_SMOKING',
    'strong:contains("Parou de fumar:")'
);

define(
    'HTML_PATIENT_DRINK',
    'strong:contains("Bebe:")'
);

define(
    'HTML_PATIENT_STOPPED_DRINKING',
    'strong:contains("Parou de beber:")'
);

define(
    'HTML_PATIENT_EXTERNAL_LESION',
    'strong:contains("Descrição da Lesão Extra-bucal:")'
);

define(
    'HTML_PATIENT_INTERNAL_LESION',
    'strong:contains("Descrição da Lesão Intra-bucal:")'
);

define(
    'HTML_PATIENT_INTERNAL_LESION_LOC',
    'strong:contains("Localização:")'
);

define(
    'HTML_PATIENT_CLINICAL_DIAGNOSIS',
    'strong:contains("Diagnóstico Clinico")'
);

define(
    'HTML_PATIENT_ADDITIONAL_EXAMS',
    'strong:contains("Exames  Complementares")'
);

define(
    'HTML_PATIENT_FINAL_DIAGNOSIS',
    'strong:contains("Diagnóstico Final:")'
);

/**
 * HTML EXTRA CONSTS
 */

define(
    'HTML_FIELD_STATE',
    'Estado:'
);

define(
    'HTML_FIELD_SMOKE',
    'Fuma:'
);

define(
    'HTML_FIELD_DRINK',
    'Bebe:'
);

define(
    'HTML_FIELD_EXTERNAL_LESION',
    'Descrição da Lesão Extra-bucal:'
);

define(
    'HTML_FIELD_LYMPH_NODES',
    'Linfonodos:'
);

define(
    'HTML_FIELD_INTERNAL_LESION',
    'Descrição da Lesão Intra-bucal:'
);

define(
    'HTML_FIELD_LOCALIZATION',
    'Localização:'
);

define(
    'HTML_FIELD_REPORT',
    'Laudo da Lesão:'
);

define(
    'HTML_FIELD_FINAL_DIAGNOSIS',
    'Diagnóstico Final:'
);