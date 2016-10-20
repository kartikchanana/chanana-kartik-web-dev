(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
// Implement userService
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
            register: register
        };
        return api;

        //Post req. for a user
        function createUser(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/user", userNew);
        }

        //Post a login req
        function login(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/login", userNew);
        }

        //Used for general login
        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        //Used for internal checking
        function findUserById(id) {
            var url="/api/user/"+id;
            return $http.get(url);
        }

        //Used for internal checking
        function findUserByUsername(username) {
            var url = "/api/user/" +username;
            return $http.get(url);
        }
        
        // Create new user
        function register(username, password) {
            var userNew = {
                username: username,
                password: password
            };
            return $http.post("/api/register", userNew);
        }

        //Update the user by checking id
        function updateUser(id, newUser) {
            var url= "/api/user/" + id;
            return $http.put(url, newUser);
        }

        // Check if the user is still loggedIn for the current session
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }
        
        //Log the user out
        function logout() {
            return $http.post("/api/logout");
        }

        //Remove user(Only for admin)
        function deleteUser(userId) {
            var url="/api/user/"+ userId;
            return $http.delete(url);
        }

    }
})();