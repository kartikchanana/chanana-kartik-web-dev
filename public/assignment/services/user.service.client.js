(function(){
    angular
        .module("WebAppMaker")
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

        function createUser(username, password, verifyPassword) {
            for (var i in users){
                if(users[i].username !== username && password === verifyPassword){
                    var userNew = {
                        _id: (new Date()).getTime()+"",
                        username: username,
                        password: password,
                        firstName: "",
                        lastName: ""
                    };
                    users.push(userNew);
                    console.log(users);
                    return userNew;
                }
            }
        }
        
        function deleteUser(userId) {
            for(var i in users){
                if(user[i]._id === userId) {
                    users.splice(userId, 1);
                    return true;
                }
            }return false;
        }
        
        function updateUser(id, newUser) {
            for(var i in users) {
                if(users[i]._id === id) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    return true;
                }
            }
            return false;
        }

        function findUserById(id) {
            for(var i in users) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername() {

        }
        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();