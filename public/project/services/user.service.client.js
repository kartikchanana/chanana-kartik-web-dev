(function(){
    angular
        .module("NoteScorer")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

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
            var url="/api/user/"+id;
            return $http.get(url);
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