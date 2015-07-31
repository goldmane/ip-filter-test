var constants = require('./constants');
//Print Args
process.argv.forEach(function(val, index, array){
    console.log(index + ': ' + val);
});
//Set Arguments
var StartupType = process.argv[2];

switch(StartupType){
    case constants.STARTUP_TYPE_SERVER:
        var server = require('./server');
        server.start(process.env.PORT || 5000);
        break;
    case constants.STARTUP_TYPE_CLIENT:
        break;
}