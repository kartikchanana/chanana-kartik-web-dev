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
// var connectionString = 'mongodb://127.0.0.1:27017/projectdata';
var connectionString = '';

if(process.env.MLAB_USERNAME_WEBDEV) {
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds121015.mlab.com:21015/heroku_zbs5978h';
}

var mongoose = require("mongoose");
var db= mongoose.connect(connectionString);

//Environment variables for local and remote server
// var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.PORT || 8000;

// var assignment = require("./assignment/app.js");
// assignment(app, mongoose, db);

require("./project/app.js")(app,mongoose);

app.listen(port);