(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifyPassword) {
            UserService
                .createUser(username, password, verifyPassword)
                .then(function (response){
                    var user = response.data;
                    if(user){
                        $location.url("/profile/"+user._id);
                    }
                });
        }
    }
})();