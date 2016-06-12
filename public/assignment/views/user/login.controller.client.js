(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = function(username, password) {
            if(username =="" || password == ""){
                vm.error = "Enter complete information";
            }else{
                UserService
                    .findUserByCredentials(username, password)
                    .then(function(response){
                        var user = response.data;
                        console.log(response);
                        if(user._id) {
                            $location.url("/profile/" + user._id);
                        } else {
                            vm.error = "User not found";
                        }
                    });
            }
        }
    }
})();