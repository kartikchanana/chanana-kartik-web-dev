(function(){
    angular
        .module("NoteScorer")
        .factory("UserService", UserService);


    var cons_key = "gtQLEX3eqNiG7HBrhf3ZTfwZVqJVrfjy";
    var cons_secret = "5kXvjuHfEUAv9EUVbMdpYcvdQtwZA79E";
    var base = "http://api.musescore.com/services/rest";
    
    function UserService($http) {
        var api = {
            createUser: createUser,
            login: login,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout: logout,
            loggedIn: loggedIn,
            register: register,
            findOwnScores: findOwnScores,
            findLiked: findLiked,
            viewFollowed: viewFollowed,
            getAllUsers: getAllUsers
        };
        return api;

        function getAllUsers() {
            return $http.get("/api/allUsers");
        }
        function viewFollowed(userId) {
            return $http.get("/api/viewFollowed/" + userId);
        }
        function findLiked(userId) {
            return $http.get("/api/renderLiked/" +userId);
        }
        function findOwnScores(userId) {
            return $http.get("/api/ownScores/" +userId);
        }
        function register(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/register", userNew);
        }
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }
        function logout() {
            return $http.post("/api/logout");
        }
        function login(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/login", userNew);
        }
        function createUser(username, password) {
            var userNew = {
//                    _id: (new Date()).getTime()+"",
                    username: username,
                    password: password
                };
                return $http.post("/api/user", userNew);
        }
        
        function deleteUser(userId) {
            var url="/api/user/"+ userId;
            return $http.delete(url);
        }
        
        function updateUser(id, newUser) {
            var url= "/api/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            if(id.length<12){
                var url = "http://api.musescore.com/services/rest/user/" + id +".jsonp&oauth_consumer_key=" + cons_key + "&?callback=JSON_CALLBACK";
                // http://api.musescore.com/services/rest/score/583.xml?oauth_consumer_key=your_consumer_key
                return $http.jsonp(url);
            }else{
                var url="/api/user/"+id;
                return $http.get(url);
            }
        }

        function findUserByUsername(username) {
            var url = "/api/user/" +username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();