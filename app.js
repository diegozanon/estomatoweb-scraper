var constants = require("./lib/constants");
var scrap = require("./lib/scrap");

function login() {

    // TODO: implement in another module
}

function main() {

    var nbOfArgs = process.argv.length;

    if (nbOfArgs != 4) { // Usage: node app.js email password

        throw constants.MSGS_INVALID_ARGS;
    }

    scrap.start(process.argv[2], process.argv[3], login, function(err) {

        if(err) throw err;
        console.log("Finished.")
    });
}

main();