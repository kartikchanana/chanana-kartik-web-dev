(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifyPassword) {
            var newUser = UserService.createUser(username, password, verifyPassword);
            if(newUser){
                $location.url("/profile/"+newUser._id);
            } else {
                vm.error = "Unable to create user";
            }
        }
    }
})();