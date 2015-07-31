function start(port){
    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    var routes = require('./api/routes');
    var handlers = require('./api/handlers');
    var router = express.Router();
    var signedRequestHandler = require('./api/security/signedRequest');
    var request = require('request');
    var ipfilter = require("express-ipfilter");
    var ipfilter2 = require("express-ip-filter");

    app.use(function(req, res, next){
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    
    app.use(function(req, res, next){
        console.log('IP: ' + req.ip);
        res.set('req.ip', req.ip);
        res.set("req.x-forwarded-for", req.headers['x-forwarded-for']);
        res.set("req.connection.remoteAddress", req.connection.remoteAddress);
        next();
    });
    
    var allowedIPs = [
        '::1', '127.0.0.1',
        '198.245.95.124',
        '198.245.95.125',
        '198.245.95.126',
        '198.245.95.127'
    ];
    app.use(ipfilter2({
        forbidden: '403: ',
        filter: allowedIPs,
        strict: false
    }));
    //app.use(ipfilter(allowedIPs, {mode: 'allow'}));
    /*
        Bellevue: 66.162.129.250
        Sydney: 115.70.220.86
        Sydney2: 115.70.231.147
        Melbourne: 115.70.164.242
        UK: 195.99.198.234
        Brazil:187.120.6.210
    */
    
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