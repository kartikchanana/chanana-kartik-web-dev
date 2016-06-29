(function(){
    angular
        .module("NoteScorer")
        .factory("NoteService", NoteService);

    var cons_key = "gtQLEX3eqNiG7HBrhf3ZTfwZVqJVrfjy";
    var cons_secret = "5kXvjuHfEUAv9EUVbMdpYcvdQtwZA79E";
    var base = "http://api.musescore.com/services/rest";

    function NoteService($http) {
        var api = {
            findNotes: findNotes,
            findNote: findNote,
            followUser: followUser,
            likeSheet: likeSheet,
            Comment: Comment,
            findOwnNotes: findOwnNotes,
            loadComments:loadComments,
            checkIfUserFollowed: checkIfUserFollowed,
            unfollowUser: unfollowUser,
            checkIfUserLiked: checkIfUserLiked,
            unlikeSheet:unlikeSheet,
            findUserScore: findUserScore,
            getAllScores: getAllScores,
            updateNote: updateNote,
            deleteNote: deleteNote,
            findUser: findUser,
            findOwnUserScores: findOwnUserScores
            // unfollowOwnUser:unfollowOwnUser
        };
        return api;

        function findOwnUserScores(userId,username) {
            return $http.get("/api/ownUserScore/" +username + "/" + userId);
        }
        function deleteNote(noteId) {
            return $http.delete("/api/score/" +noteId);
        }
        
        function updateNote(noteId, note) {
            var url="/api/updateScore/"+ noteId;
            return $http.put(url ,note);
        }
        function getAllScores() {
            return $http.get("/api/allScores");
        }
        function findUserScore(scoreId) {
            return $http.get("/api/renderScore/" + scoreId);
        }
        function checkIfUserLiked(noteId, userId) {
            return $http.get("/api/checkLike/" +noteId + "/" + userId);
        }
        function unfollowUser(unfollowId, userId) {
            return $http.put("/api/unfollow/" + unfollowId + "/" + userId);
        }
        function unlikeSheet(noteId, userId) {
            return $http.put("/api/unlike/" + noteId + "/" + userId);
        }
        function checkIfUserFollowed(composer, userId) {
            return $http.get("/api/checkFollow/" + composer + "/" + userId);
        }
        function loadComments(scoreId) {
            return $http.get("/api/comments/" +scoreId);
        }

        function Comment(comment, noteId, username) {
            return $http.put("/api/comment/" +noteId + "/" + comment + "/" + username);
        }
        function likeSheet(noteId) {
            return $http.put("/api/like/" +noteId);
        }
        function followUser(userId) {
            return $http.put("/api/follow/" +userId);
        }

        function findOwnNotes(searchText) {
            return $http.get("/api/search/" +searchText);
        }
        function findNotes(searchText, pageNo) {
            var url = base + "/score.jsonp&oauth_consumer_key=" + cons_key + "&text=" + searchText + "&page=" + pageNo + "?callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }
        function findUser(userId) {
            var url = base + "/user/" + userId + "/score.jsonp"  + "?callback=JSON_CALLBACK&oauth_consumer_key=" + cons_key;
            return $http.jsonp(url);
        }
        function findNote(scoreId) {
                var url = base + "/score/" + scoreId + ".jsonp"  + "?callback=JSON_CALLBACK&oauth_consumer_key=" + cons_key;
                return $http.jsonp(url);

        }

    }
})();