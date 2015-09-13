function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true,
        writable: false
    });
}

define(
    'MSG_ERROR_ARGS',
    'Error: you must provide two valid command line arguments. \nUsage: node app.js email password'
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

define(
    'SITE_PATIENTS_PERPAGE',
    15
);

define(
    'FILE_NAME',
    './tmp/output.csv'
);

define(
    'FILE_HEADER',
    'TODO:'
);

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

define(
    'HTML_PATIENT_NAME',
    'strong:contains("Nome:")'
);

define(
    'HTML_PATIENT_EMAIL',
    'strong:contains("E-mail:")'
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
    'HTML_PATIENT_AGE',
    'strong:contains("Idade.")'
);

define(
    'HTML_PATIENT_RACE',
    'strong:contains("Raça:")'
);

define(
    'HTML_PATIENT_GENRE',
    'strong:contains("Sexo:")'
);

define(
    'HTML_PATIENT_BORNIN',
    'strong:contains("Natural de:")'
);

define(
    'HTML_PATIENT_PROFESSION',
    'strong:contains("Profissão:")'
);

define(
    'HTML_PATIENT_CPF',
    'strong:contains("Cpf do paciente:")'
);

define(
    'HTML_PATIENT_RESPNAME',
    'strong:contains("Nome do responsável:")'
);

define(
    'HTML_PATIENT_KINSHIP',
    'strong:contains("Grau de parentesco:")'
);

define(
    'HTML_PATIENT_ADDRESS',
    'strong:contains("Endereço:")'
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
    'HTML_PATIENT_CEP',
    'strong:contains("Cep:")'
);

define(
    'HTML_PATIENT_FIRSTTEL',
    'strong:contains("1° Telefone:")'
);

define(
    'HTML_PATIENT_SECTEL',
    'strong:contains("2° Telefone:")'
);

define(
    'HTML_PATIENT_THIRDTEL',
    'strong:contains("3° Telefone:")'
);

define(
    'HTML_PATIENT_DIRECTEDBY',
    'strong:contains("Encaminhado por")'
);

define(
    'HTML_PATIENT_PROFESSOR',
    'strong:contains("Professor responsável")'
);

define(
    'HTML_PATIENT_COMPLAINT',
    'strong:contains("Descrição da queixa:")'
);

define(
    'HTML_PATIENT_ILLNESSHISTORY',
    'strong:contains("História da Doença Atual:")'
);

define(
    'HTML_PATIENT_DURATION',
    'strong:contains("Tempo de duração:")'
);