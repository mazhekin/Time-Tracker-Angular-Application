/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7209;

/*var multer  = require('multer');
app.use(multer({dest: './uploads/'}));*/

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);

//var routes = require('./routes/index')(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res/*, next*/) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
    case 'deploy':
        console.log('** DEPLOY **');
        app.use('/images', express.static('./images/'));
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    case 'build':
        console.log('** BUILD **');
        app.use('/images', express.static('./deploy/images/'));
        app.use(express.static('./deploy/build/'));
        app.use('/*', express.static('./deploy/build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use('/images', express.static('./src/server/images/'));
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port gulp serve-dev' + port);
    console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
