function start(port){
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    var routes = require('./api/routes');
    var handlers = require('./api/handlers');
    var router = express.Router();
    var signedRequestHandler = require('./api/security/signedRequest');
    var request = require('request');

    app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    
    routes.setup(router, handlers, request);
    router.use(signedRequestHandler);

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use('/api', router);
    app.use(express.static(__dirname + '/sites'));        

    var server = app.listen(port || 5000, function(){
        var host = server.address().address;
        var port = server.address().port;
        console.log('App listening at http://%s:%s', host, port);
    });
};

exports.start = start;