(function(){
    angular
        .module("NoteScorer")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifyPassword) {
            if(!username){
                vm.nameError = "Username required";
                vm.error = "Username required";
            }else if(!password) {
                vm.pwdError= "Password required";
                vm.error= "Password required";
            }else if(!verifyPassword) {
                vm.vpwdError = "Verify password required";
                vm.error = "Verify password required";
            }else if(verifyPassword != password){
                vm.allError = "Password and verify password don't match";
                vm.error = "Password and verify password don't match";
            }
            else{
                UserService
                    .register(username, password, verifyPassword)
                    .then(function (response){
                        var user = response.data;
                        if(user){
                            $location.url("/");
                        }else{
                            vm.error= "Error in registration";
                        }
                    });
            }

        }
    }
})();