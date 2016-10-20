(function(){
    angular
        .module("NoteScorer")
        .factory("NoteService", NoteService);

    //Key secret pair for API
    var cons_key = process.env.MUSE_KEY;
    var cons_secret = process.env.MUSE_SECRET;
    
    //Base url for all API calls
    var base = "http://api.musescore.com/services/rest";

    //Service implementation
    function NoteService($http) {
        var api = {
            findNotes: findNotes,
            findOwnUserScores: findOwnUserScores,
            findNote: findNote,
            findOwnNotes: findOwnNotes,
            followUser: followUser,
            findUserScore: findUserScore,
            findUser: findUser,
            loadComments: loadComments,
            checkIfUserFollowed: checkIfUserFollowed,
            checkIfUserLiked: checkIfUserLiked,
            getAllScores: getAllScores,
            unlikeSheet: unlikeSheet,
            unfollowUser: unfollowUser,
            updateNote: updateNote,
            likeSheet: likeSheet,
            Comment: Comment,
            deleteNote: deleteNote
        };
        return api;

        //Get notes from API
        function findNotes(searchText, pageNo) {
            var url = base + "/score.jsonp&oauth_consumer_key=" + cons_key + "&text=" + searchText + "&page=" + pageNo + "?callback=JSON_CALLBACK";
            return $http.jsonp(url);
        }

        //Find all notes/scores created by local users
        function findOwnUserScores(userId, username) {
            return $http.get("/api/ownUserScore/" + username + "/" + userId);
        }

        //Find score for particular user
        function findUserScore(scoreId) {
            return $http.get("/api/renderScore/" + scoreId);
        }

        //Find notes current user created
        function findOwnNotes(searchText) {
            return $http.get("/api/search/" + searchText);
        }

        //FInd the composer/creator for the score
        function findUser(userId) {
            var url = base + "/user/" + userId + "/score.jsonp" + "?callback=JSON_CALLBACK&oauth_consumer_key=" + cons_key;
            return $http.jsonp(url);
        }

        //Find the score from the api
        function findNote(scoreId) {
            var url = base + "/score/" + scoreId + ".jsonp" + "?callback=JSON_CALLBACK&oauth_consumer_key=" + cons_key;
            return $http.jsonp(url);
        }

        //Find all local scores
        function getAllScores() {
            return $http.get("/api/allScores");
        }

        //Check for the liked flag
        function checkIfUserLiked(noteId, userId) {
            return $http.get("/api/checkLike/" + noteId + "/" + userId);
        }

        //Check i=for followed flag for a composer
        function checkIfUserFollowed(composer, userId) {
            return $http.get("/api/checkFollow/" + composer + "/" + userId);
        }

        //
        function loadComments(scoreId) {
            return $http.get("/api/comments/" + scoreId);
        }

        //Update a score
        function updateNote(noteId, note) {
            var url = "/api/updateScore/" + noteId;
            return $http.put(url, note);
        }

        //Unfollow a user for current user profile
        function unfollowUser(unfollowId, userId) {
            return $http.put("/api/unfollow/" + unfollowId + "/" + userId);
        }

        //Unlike a sheet for the current user
        function unlikeSheet(noteId, userId) {
            return $http.put("/api/unlike/" + noteId + "/" + userId);
        }



        function Comment(comment, noteId, username) {
            return $http.put("/api/comment/" + noteId + "/" + comment + "/" + username);
        }

        function likeSheet(noteId) {
            return $http.put("/api/like/" + noteId);
        }

        function followUser(userId) {
            return $http.put("/api/follow/" + userId);
        }
        
        //delete a local note
        function deleteNote(noteId) {
            return $http.delete("/api/score/" + noteId);
        }

        
    }
})();