(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(username, password, verifyPassword) {
            console.log("hey there");
            if(vm.registerForm.username == ""){
                vm.nameError = "Username required";
            }else if(vm.registerForm.password == "") {
                vm.pwdError= "Password required";
            }else if(vm.registerForm.verifyPassword == "") {
                vm.vpwdError = "Verify password required";
            }else{
                UserService
                    .register(username, password, verifyPassword)
                    .then(function (response){
                        var user = response.data;
                        if(user){
                            $location.url("/profile/"+user._id);
                        }else{
                            vm.error= "Error in registration";
                        }
                    });
            }

        }
    }
})();