var constants = require("./lib/constants");
var scrap = require("./lib/scrap");
var login = require("./lib/login");
var pageNavigator = require("./lib/pageNavigator");
var patientData = require("./lib/patientData");
var fileWriter = require("./lib/fileWriter");

var scrapModules = {
    login: login,
    pageNavigator: pageNavigator,
    targetData: patientData,
    writer: fileWriter
};

function main() {

    var nbOfArgs = process.argv.length;

    if(nbOfArgs != 4) { // Usage: node app.js email password

        throw constants.MSGS_INVALID_ARGS;
    }

    var loginData = {
        email: process.argv[2],
        password: process.argv[3]
    };

    scrap.start(loginData, scrapModules, function(err) {

        if(err) throw err;
        console.log("Finished.");
    });
}

main();