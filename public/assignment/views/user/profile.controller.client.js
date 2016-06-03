(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.flag = 0;
        var id = $routeParams.userId;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response){
                        vm.success = "Profile saved successfully";
                    },
                    function(error){
                        vm.error = "Profile save failed";
                    });
            vm.flag = 1;
        }
    }

})();