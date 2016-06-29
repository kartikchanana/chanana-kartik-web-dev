module.exports = function (app, models) {

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    var noteModel = models.noteModel;
    var userModel = models.userModel;

    app.get("/api/allScores", getAllScores);
    app.put("/api/unlike/:noteId/:userId", unlikeSheet);
    app.put("/api/comment/:noteId/:comment/:username", Comment);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/search/:searchText", findOwnNotes); 
    app.get("/api/search/:scoreId", findOwnNote);
    app.get("/api/comments/:scoreId", loadComments);
    app.put("/api/like/:noteId" , likeSheet);
    app.get("/api/checkLike/:noteId/:userId", checkLike);
    app.get("/api/renderScore/:scoreId", findUserScore);
    app.put("/api/updateScore/:scoreId", updateScore);
    app.delete("/api/score/:scoreId" , deleteScore);
    app.get("/api/ownUserScore/:username/:userId", getOwnScores);

    function getOwnScores(req,res) {
        var userId = req.params.userId;
        var username = req.params.username;
        noteModel
            .getOwnScores(userId,username)
            .then(function (response) {
                res.send(response);
            });
    }
    function deleteScore(req,res) {
        var scoreId = req.params.scoreId;
        noteModel
            .deleteScore(scoreId)
            .then(function (stats) {
                console.log(stats);
                res.send(200);
            });
    }
    function updateScore(req, res) {
        var scoreId = req.params.scoreId;
        var score = req.body;
        noteModel
            .updateScore(scoreId, score)
            .then(function (stats) {
                console.log(stats);
                res.send(200);
            });
    }
    function getAllScores(req, res) {
        noteModel
            .getAllScores()
            .then(function (scores) {
                res.json(scores);
            });
    }
    
    function findUserScore(req,res) {
        var scoreId = req.params.scoreId;
        if(scoreId.length <10){
            noteModel
                .findApiNoteComment(scoreId)
                .then(function (score) {
                    res.json(score);
                });
        }else{
            noteModel
                .findOwnNote(scoreId)
                .then(function (score) {
                    res.json(score);
                });
        }
        
    }
    
    function checkLike(req, res) {
        var noteId = req.params.noteId;
        var userId = req.params.userId;
        if(noteId.length <10){
            noteModel
                .checkApiLike(noteId, userId)
                .then(function (score) {
                    res.json(score);
                });
        }else{
            noteModel
                .checkOwnLike(noteId, userId)
                .then(function (score) {
                    res.json(score);
                });
        }
    }
    function unlikeSheet(req,res) {
        var noteId = req.params.noteId;
        var userId = req.params.userId;
        if(noteId.length<10){
            noteModel
                .unlikeApiSheet(noteId, userId)
                .then(function (stats) {
                    console.log(stats);
                }, function(error) {
                    res.statusCode(404).send(error);
                });
        }else{
            noteModel
                .unlikeOwnSheet(noteId, userId)
                .then(function (stats) {
                    res.send(200);
                }, function(error) {
                    res.statusCode(404).send(error);
                });
        }
        
    }
    function likeSheet(req,res) {
        var noteId = req.params.noteId;
        var user = req.user;
        var userId = user._id;
        if(noteId.length <10){
            noteModel
                .findApiNoteComment(noteId)
                .then(function (response) {
                    if (response == null) {
                        noteModel
                            .addLike(noteId, userId)
                            .then(function (response) {
                                userModel
                                    .likeSheet(userId, noteId)
                                    .then(function (response) {
                                        res.send(200);
                                    });
                            });
                    } else {  
                        noteModel
                            .pushApiLike(noteId, userId)
                            .then(function (response) {
                                userModel
                                    .likeSheet(userId, noteId)
                                    .then(function (response) {
                                        res.send(200);
                                    });
                            });
                    }
                });
        }else{
            noteModel
                .pushOwnLike(noteId, userId)
                .then(function (response) {
                    userModel
                        .likeSheet(userId, noteId)
                        .then(function (response) {
                            res.send(200);
                        });
                });
        }
    }

    function findOwnNote(req, res) {
        var scoreId = req.params.scoreId;
        noteModel
            .findOwnNote(scoreId)
            .then(function (score) {
                res.json(score);
            });
    }
    function loadComments(req,res) {
        var scoreId = req.params.scoreId;
        if(scoreId.length < 10){
            noteModel
                .loadComments(scoreId)
                .then(function (score) {
                    res.json(score);
                }, function (error) {
                    res.statusCode(404).send(error);
                });
        }else{
            noteModel
                .loadOwnComments(scoreId)
                .then(function (score) {
                    res.json(score);
                }, function (error) {
                    res.statusCode(404).send(error);
                });
        }

    }
    
    function Comment(req,res) {
        var comment = req.params.comment;
        var noteId = req.params.noteId;
        var username = req.params.username;
        if(noteId.length <10){
            noteModel
                .findApiNoteComment(noteId)
                .then(
                    function (response) {
                        if(response == null){
                            noteModel
                                .addApiComment(comment, noteId, username)
                                .then(
                                    function (stats) {
                                        res.send(200);
                                    },
                                    function (error) {
                                        res.statusCode(404).send(error);
                                    });
                        }else{
                            noteModel
                                .pushComment(comment, noteId, username)
                                .then(function (response) {
                                        res.json(200);
                                    },
                                    function (error) {
                                        res.statusCode(404).send(error);
                                    });
                        }
                    }

                );
        }else{
            noteModel
                .addComment(comment, noteId, userId)
                .then(
                    function (stats) {
                        console.log(stats);
                        res.send(200);
                    },
                    function (error) {
                        res.statusCode(404).send(error);
                    });
        }
    }

    function findOwnNotes(req, res) {
        var searchText = req.params.searchText;
        noteModel
            .findOwnNotes(searchText)
            .then(function (notes) {
                res.json(notes);
            });
    }

    function uploadImage(req, res) {
        // title description license duration keysig pages secret parts url
        var scoreId;
        var userId     = req.body.userId;
        var username   = req.body.username;
        var title      = req.body.title;
        var description= req.body.description;
        var license    = req.body.license;
        var duration   = req.body.duration;
        var keysig     = req.body.keysig;
        var pages      = req.body.pages;
        var secret     = req.body.secret;
        var parts      = req.body.parts;
        var url        = req.body.url;
        var myFile     = req.file;

        if(myFile == null)
        {
            res.redirect("/project/#/");
            return;
        }
        
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var url= "/uploads/"+filename;

        if(myFile != null){
            var Score={
                apiId: 0,
                title: title,
                description: description,
                license: license,
                metadata:{
                    duration: duration,
                    keysig: keysig,
                    pages: pages,
                    parts: parts
                },
                secret: secret,
                url: url,
                user:{
                    uid: userId,
                    username: username
                }
            };
            
            noteModel
                .createScore(Score)
                .then(function (score) {
                    var scoreId = score._id;
                    noteModel
                        .updateScore(scoreId, Score)
                        .then(function (stats) {
                            userModel
                                .addComposition(userId, scoreId)
                                .then(function (response) {
                                    console.log(stats);
                                    res.send(200);
                                });
                            },
                            function(error) {
                                res.statusCode(404).send(error);
                            });
                });
        }

        
        res.redirect("/project/#/");
    }

};