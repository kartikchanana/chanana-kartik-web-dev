(function(){
    angular
        .module("NoteScorer")
        .factory("UserService", UserService);

    //Implement user service functions
    function UserService($http) {
        var api = {
            login: login,
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            findOwnScores: findOwnScores,
            findLiked: findLiked,
            viewFollowed: viewFollowed,
            getAllUsers: getAllUsers,
            updateUser: updateUser,
            register: register,
            unlikeSheetUser: unlikeSheetUser,
            deleteUser: deleteUser,
            logout: logout,
            loggedIn: loggedIn

        };
        return api;

        //Send login http call
        function login(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/login", userNew);
        }

        //Find username- just for internal use
        function findUserByUsername(username) {
            var url = "/api/user/" +username;
            return $http.get(url);
        }

        //Verify user credentials
        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
        
        //Find all local users
        function getAllUsers() {
            return $http.get("/api/allUsers");
        }

        //Find followed users for current user
        function viewFollowed(userId) {
            return $http.get("/api/viewFollowed/" + userId);
        }

        //FInd liked score for current users
        function findLiked(userId) {
            return $http.get("/api/renderLiked/" +userId);
        }

        //Get list of scores created by current user
        function findOwnScores(userId) {
            return $http.get("/api/ownScores/" +userId);
        }

        //Uncheck the liked flag
        function unlikeSheetUser(noteId, userId) {
            return $http.put("/api/unlikeit/" +noteId + "/" + userId);
        }
        
        //Register a new user
        function register(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/register", userNew);
        }

        //Check if current user is still logged in
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        //Log the user out
        function logout() {
            return $http.post("/api/logout");
        }

        //Obsolete
        function createUser(username, password) {
            var userNew = {
                    username: username,
                    password: password
                };
                return $http.post("/api/user", userNew);
        }

        //Update current user with the details in newUser
        function updateUser(id, newUser) {
            var url= "/api/user/" + id;
            return $http.put(url, newUser);
        }
        
        //Delete the entry for current user
        function deleteUser(userId) {
            var url="/api/user/"+ userId;
            return $http.delete(url);
        }

    }
})();