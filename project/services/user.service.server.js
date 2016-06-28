var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, models) {

    var userModel = models.userModel;
    var noteModel = models.noteModel;
    
    app.put("/api/unlikeit/:noteId/:userId", unlikeSheet);
    app.get("/api/allUsers", getAllUsers);
    app.get("/api/viewFollowed/:userId", viewFollowed);
    app.get("/api/renderLiked/:userId" ,renderLiked);
    app.get("/api/ownScores/:userId", getOwnScores);
    app.put("/api/follow/:userId", followUser);
    app.get("/api/checkFollow/:composer/:userId", checkFollow);
    app.put("/api/unfollow/:unfollowId/:userId", unfollowUser);
    app.get("/api/user", getUsers);
    app.post("/api/login", passport.authenticate('project'), login);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/logout",logout);
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/register", register);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    // app.get("/auth/facebook", passport.authenticate('facebook'));
    // app.get('/auth/facebook/callback',
    //     passport.authenticate('facebook', {
    //         successRedirect: '/project/#/',
    //         failureRedirect: '/project/#/login'
    //     }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));

    passport.use('project' ,new LocalStrategy(projectlocalStrategy));
    passport.serializeUser(serializeUser);

    passport.deserializeUser(deserializeUser);

    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // };
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };
    // passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }
    function projectlocalStrategy(username, password, done) {
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

    function unlikeSheet(req,res) {
        var noteId = req.params.noteId;
        var userId = req.params.userId;
        console.log(noteId);
        console.log(userId);
        userModel
            .unlikeSheet(noteId, userId)
            .then(function (response) {
                console.log("|||||");
                console.log(response);
                res.send(200);
            }, function (error) {
                res.statusCode(400).send(error);
            });
    }
    function getAllUsers(req, res) {
        userModel
            .getAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
    
    function viewFollowed(req, res) {
        var userId = req.params.userId;
        userModel
            .findOwnScores(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.send(404).send(error);
            });
    }
    function renderLiked(req,res) {
        var userId = req.params.userId;
        userModel
            .findOwnScores(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.send(404).send(error);
            });
    }
    function getOwnScores(req, res) {
        var userId = req.params.userId;
        userModel
            .findOwnScores(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.send(404).send(error);
            });
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
    
    function checkFollow(req,res) {
        var composer = req.params.composer;
        var userId = req.params.userId;
        console.log("composer is:" + composer);
        console.log("user is:" + userId);
        userModel
            .checkFollow(composer, userId)
            .then(
                function (user) {
                    res.send(user);
                    console.log("checked if following or not");
                    console.log(user);
                }, function (error) {
                    console.log("warning error");
                    console.log(error);
                    res.statusCode(404).send(error);
                }
            );
    }
    
    function followUser(req,res) {
        var user = req.user;
        var userId = user._id;
        var userIdToFollow = req.params.userId;
        userModel
            .followUser(userId, userIdToFollow)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    function unfollowUser(req, res) {
        var unfollowId = req.params.unfollowId;
        var userId = req.params.userId;
        console.log(unfollowId);
        console.log(userId);
        userModel
            .unfollowUser(unfollowId, userId)
            .then(function (stats) {
                console.log(stats);
                res.send(200);
            }, function(error) {
                res.statusCode(404).send(error);
            });
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