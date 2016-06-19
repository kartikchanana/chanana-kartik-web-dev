(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        
        function login (username, password) {
            if(!password && !username){
                vm.allError= "Enter all details";
                vm.error= "Enter all details";
            }
            else if(!password){
                vm.pwdError = "Password required";
                vm.error = "Password required";
            }else if(!username){
                vm.nameError = "Username required";
                vm.error = "Username required";
            }else{
                UserService
                    .login(username, password)
                    .then(function(response){
                        var user = response.data;
                        console.log("response:" +user);
                        if(user._id) {
                            $location.url("/profile");
                        } else {
                            vm.error = response.error;
                        }
                    });
            }
        }
    }
})();