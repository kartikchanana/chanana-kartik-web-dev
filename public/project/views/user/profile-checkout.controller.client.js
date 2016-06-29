(function(){
    angular
        .module("NoteScorer")
        .controller("ProfileCheckoutController", ProfileCheckoutController);

    function ProfileCheckoutController($location, $routeParams,$rootScope, UserService, NoteService) {
        var vm = this;
        vm.logout = logout;
        vm.flag = 0;
        // var id = $rootScope.currentUser._id;
        vm.checkId = $routeParams.userId;
        vm.checkName = $routeParams.username;
        vm.apiNotes=[];

        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
            }
            if(vm.checkId.length <10){
                NoteService
                    .findUser(vm.checkId)
                    .then(function (response) {
                        if(response.data != null){
                            vm.apiNotes = response.data;
                        }
                    });
            }else{
                NoteService
                    .findOwnUserScores(vm.checkId, vm.checkName)
                    .then(function (response) {
                        if(response.data != null){
                            vm.apiNotes = response.data;
                        }
                    });
            }
        }
        init();

        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/checkProfile/" +vm.checkName+ "/" + vm.checkId);
                        vm.flag=0;
                    },
                    function () {
                        $location.url("/checkProfile/" +vm.checkName+ "/" + vm.checkId);
                        vm.flag =1;
                    }
                )
        }
        
        
    }

})();