var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function (app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get("/api/user", getUsers);
    app.post("/api/login", passport.authenticate('local'), login);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/logout",logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/profile',
            failureRedirect: '/assignment/#/login'
        }));

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);

    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null, user);
                    }else{
                        done(null, false);
                    }
                    res.json(user);
                },
                function(err) {
                    done(err);
                }
            );
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function facebookLogin(token, refreshToken, profile, done) {
        console.log(profile);
        userModel
            .findFacebookUser(profile.id)
            .then(function (facebookUser) {
                if(facebookUser){
                    return done(null, facebookUser);
                }else{
                    facebookUser= {
                        username: profile.displayName.replace(/ /g,''),
                        facebook: {
                            token: token,
                            id: profile.id,
                            displayName: profile.displayName
                        }
                    };
                    userModel
                        .createUser(facebookUser)
                        .then(function (user) {
                            done(null, user);
                        });
                }
            });
    }
    function register(req,res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("Username already in use");
                        return;
                    }else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function (err) {
                    res.send(400).send(err);
                }
            )
            .then(function (user) {
                if(user){
                    req.login(user, function (err) {
                        if(err){
                            res.send(400).send(err);
                        }else{
                            res.json(user);
                        }
                    });
                }
            },function (err) {
                    res.send(400).send(err);
                })
    }
    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }
    function logout(req, res) {
        req.logout();
        res.send(200);
    }
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
    }
    
    function findUserById(req, res) {
        var id = req.params.userId;
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user);
            },
            function (error) {
                res.statusCode(404).send(error);
            });
        
        // for (var i in users){
        //     if(users[i]._id === id){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function getUsers(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res, username, password);
        }else if(username){
            findUserByUsername(res, username);
        }
    }


    
    function findUserByUsername(res, username) {
        for (var i in users){
            if(users[i].username === username){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

};