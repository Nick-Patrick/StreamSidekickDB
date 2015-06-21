var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var request = require('requestretry');
var fs = require('fs');
var config = require('./config');
var Db = mongoose.db;

mongoose.connect(config.database.host);
var db = mongoose.connection;

var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(app);
    }
});

app.listen(port, function () {
    console.log('running on port: ' + config.port);
});