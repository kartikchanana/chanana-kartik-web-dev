(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;

        var id = $routeParams.id;

        function createUser(username, password, verifyPassword) {
            UserService.createUser(username, password, verifyPassword);
        }
    }

})();