(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
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

        function unregister(){
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    }, function(){
                        vm.error= "Unable to remove user";
                    });
        }
        
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