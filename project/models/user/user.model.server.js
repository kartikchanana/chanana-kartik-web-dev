module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")(mongoose);
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findFacebookUser: findFacebookUser,
        followUser: followUser,
        unfollowUser: unfollowUser,
        likeSheet: likeSheet,
        checkFollow:checkFollow,
        unlikeSheet:unlikeSheet,
        findUserByGoogleId: findUserByGoogleId,
        findOwnScores: findOwnScores,
        addComposition: addComposition,
        getAllUsers: getAllUsers
    };
    return api;

    function getAllUsers() {
        return User.find({});
    }
    function addComposition(userId, noteId) {
        return User
            .update({_id: userId}, {
                $push: {
                    composed: noteId
                }
            });
    }
    function findOwnScores(userId) {
        return User.findById(userId);
    }
    function findUserByGoogleId(id) {
        return User.findOne({"google.id": id});
    }
    function unlikeSheet(noteId, userId) {
        console.log("reached user model to unlike");
        console.log("at" +noteId);
        console.log("at" +userId);
        return User.update({_id: userId},
            {$pull: {liked: noteId}});
    }
    function unfollowUser(unfollowId, userId) {
        return User.update({_id: userId},
            {$pull: {followed: unfollowId}});
    }
    function checkFollow(composer, userId) {
        return User.findOne({
            $and: [
                {_id: userId},
                {followed: composer}
            ]
        });
    }
    function followUser(userId, userIdToFollow) {
        return User
            .update({_id: userId}, {
            $push: {
                followed: userIdToFollow
            }
        });
    }

    function likeSheet(userId, noteId) {
        return User
            .update({_id: userId}, {
                $push: {
                    liked: noteId
                }
            });
    }

    function findFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }
    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    function updateUser(userId, user) {
        var currentUser = User.findById(userId);

        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function createUser(user) {
        return User.create(user);
    }
    
    
};