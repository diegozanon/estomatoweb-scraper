var constants = require("./lib/constants");
var processArgs = require("./lib/processArgs");
var scrap = require("./lib/scrap");
var login = require("./lib/login");
var pageNavigator = require("./lib/pageNavigator");
var patientData = require("./lib/patientData");
var fileWriter = require("./lib/fileWriter");

function main() {

    processArgs.validate(); // throws error if invalid

    var loginData = processArgs.retrieveLoginData();

    var scrapModules = {
        login: login,
        pageNavigator: pageNavigator,
        targetData: patientData,
        writer: fileWriter
    };

    scrap.start(loginData, scrapModules, function(err) {
        if(err) throw err;
        console.log("Finished with success.");
    });
}

main();