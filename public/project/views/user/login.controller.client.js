(function(){
    angular
        .module("NoteScorer")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, $rootScope) {
        var vm = this;

        vm.login = login;
        
        //Validate login details and then authenticate
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
                        console.log(response);
                        if(user._id) {
                            if($rootScope.previousUrl){
                                $location.url($rootScope.previousUrl);
                            }else{
                                $location.url("/");
                            }
                        } else {
                            vm.error = response.error;
                            $location.url("/");
                        }
                    }, function (error) {
                        vm.error=error.data;
                        $location.url("/login");
                    });
            }
        }
    }
})();