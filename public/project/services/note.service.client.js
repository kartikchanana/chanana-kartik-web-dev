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
            deleteNote: deleteNote
            // unfollowOwnUser:unfollowOwnUser
        };
        return api;

        function deleteNote(noteId) {
            return $http.delete("/api/score/" +noteId);
        }
        
        function updateNote(noteId, note) {
            console.log(noteId);
            console.log(note);
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
            console.log("At service client");
            console.log(unfollowId);
            console.log(userId);
            return $http.put("/api/unfollow/" + unfollowId + "/" + userId);
        }
        // function unfollowOwnUser(unfollowId, userId) {
        //     return $http.put("/api/unfollowown/" + unfollowId + "/" + userId);
        // }
        function unlikeSheet(noteId, userId) {
            return $http.put("/api/unlike/" + noteId + "/" + userId);
        }
        function checkIfUserFollowed(composer, userId) {
            return $http.get("/api/checkFollow/" + composer + "/" + userId);
        }
        function loadComments(scoreId) {
            return $http.get("/api/comments/" +scoreId);
        }

        function Comment(comment, noteId, userId) {
            return $http.put("/api/comment/" +noteId + "/" + comment + "/" + userId);
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
        function findNote(scoreId) {
            if(scoreId.length < 10){
                var url = base + "/score/" + scoreId + ".jsonp"  + "?callback=JSON_CALLBACK&oauth_consumer_key=" + cons_key;
                console.log(url);
                return $http.jsonp(url);
            }else{
                console.log("own note" + scoreId);
                return $http.get("/api/search/" + scoreId);
            }

        }

    }
})();