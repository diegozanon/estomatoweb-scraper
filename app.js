var constants = require("./lib/constants");
var processArgs = require("./lib/processArgs");
var scrap = require("./lib/scrap");
var login = require("./lib/login");
var pageNavigator = require("./lib/pageNavigator");
var patientData = require("./lib/patientData");
var fileWriter = require("./lib/fileWriter");

processArgs.validate(); // throws error if invalid

var loginData = processArgs.retrieveLoginData();

var scrapModules = {
    login: login,
    pageNavigator: pageNavigator,
    targetData: patientData,
    writer: fileWriter
};

scrap.start(loginData, scrapModules, function(err) {
    if(err) {
      console.error(err.stack || err);
      return;
    }

    console.log("Finished with success.");
});
