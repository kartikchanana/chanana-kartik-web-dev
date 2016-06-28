module.exports = function() {

    var mongoose = require("mongoose");
    var NoteSchema = require("./note.schema.server.js")(mongoose);
    var Note = mongoose.model("Note", NoteSchema);

    var api = {
        addComment: addComment,
        addApiComment: addApiComment,
        createScore:createScore,
        updateScore: updateScore,
        findOwnNotes: findOwnNotes,
        findOwnNote: findOwnNote,
        loadComments: loadComments,
        findApiNoteComment: findApiNoteComment,
        pushComment: pushComment,
        pushApiLike: pushApiLike,
        addLike: addLike,
        pushOwnLike: pushOwnLike,
        checkOwnLike: checkOwnLike,
        checkApiLike: checkApiLike,
        unlikeApiSheet: unlikeApiSheet,
        unlikeOwnSheet: unlikeOwnSheet,
        getAllScores: getAllScores,
        updateScore: updateScore,
        deleteScore: deleteScore,
        loadOwnComments: loadOwnComments
    };
    return api;

    function deleteScore(scoreId) {
        return Note.remove({_id: scoreId});
    }
    function updateScore(scoreId, score) {
        return Note
            .update({_id: scoreId},{
                $set: {
                    title: score.title
                }
            });
    }
    function getAllScores() {
        return Note.find({apiId: 0});
    }
    function unlikeApiSheet(noteId, userId) {
        console.log("reached note model to unlike");
        return Note.update({apiId: noteId},
            {$pull: {liker: userId}});
    }
    function unlikeOwnSheet(noteId, userId) {
        return Note.update({_id: noteId},
            {$pull: {liker: userId}});
    }
    function checkOwnLike(noteId, userId) {
        return Note.findOne({
            $and: [
                {_id: noteId},
                {liker: userId}
            ]
        });
    }
    function checkApiLike(noteId, userId) {
        console.log("comes to model to check like");
        return Note.findOne({
            $and: [
                {apiId: noteId},
                {liker: userId}
            ]
        });
    }
    function pushApiLike(noteId, likerId) {
        return Note.update(
            {apiId: noteId},
            {$push: {liker: likerId}
        });
    }

    function addLike(noteId, likerId) {
        return Note
            .create({
                apiId: noteId,
                liker: likerId
            });
    }
    
    function pushOwnLike(noteId, likerId) {
        return Note.update({_id: noteId},{
            $push: {
                liker: likerId
            }
        });
    }
    function findApiNoteComment(noteId) {
        return Note.findOne({apiId: noteId});
    }
    function loadComments(scoreId) {
        return Note.findOne({apiId: scoreId});
    }
    function loadOwnComments(scoreId) {
        return Note.findOne({_id: scoreId});
    }
    function findOwnNote(scoreId) {
        return Note.findOne({_id: scoreId});
    }
    function findOwnNotes(searchText) {
        return Note.find({title: searchText});
    }

    function addComment(comment, noteId, userId) {
        return Note
            .update({_id: noteId} ,{
            $push: {
                comments: {
                    userId: userId,
                    comment: comment
                }
            }
        });
    }

    function pushComment(comment, noteId, userId) {
        return Note
            .update({apiId: noteId} , {
                $push: {
                    comments: {
                        userId: userId,
                        comment: comment
                    }
                }
            });
    }

    function addApiComment(comment, noteId, userId) {
        return Note
            .create({
                apiId: noteId,
                comments: {
                    userId: userId,
                    comment: comment
                }
            })
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
    }
    
    function createScore(score) {
        console.log(score);
        return Note.create(score);
    }

    function updateScore(scoreId, score) {
        delete score._id;
        return Note
            .update({_id: scoreId},{
                $set: {
                    apiId: score.apiId,
                    title: score.title,
                    description: score.description,
                    license: score.license,
                    metadata:score.metadata,
                    secret: score.secret,
                    user:score.user,
                    url: score.url
                }
            });
    }
};