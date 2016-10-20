// required packages
var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
var app = express();

var bodyParser = require('body-parser');
// To read raw JSON data retrieved
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// To read cookies
app.use(cookieParser());
// Save environment variable
app.use(session({ secret: process.env.SESSION_SECRET }));

//passport for authorisation
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB
var connectionString = 'mongodb://127.0.0.1:27017/projectdata';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var mongoose = require("mongoose");
var db= mongoose.connect(connectionString);

//Environment variables for local and remote server
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8000;

// var assignment = require("./assignment/app.js");
// assignment(app, mongoose, db);

require("./project/app.js")(app,mongoose);

app.listen(port, ipaddress);