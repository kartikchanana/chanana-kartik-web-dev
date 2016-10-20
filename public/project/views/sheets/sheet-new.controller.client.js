(function () {
    angular
        .module("NoteScorer")
        .controller("NewSheetController", NewSheetController);
    
    function NewSheetController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;
        vm.logout = logout;

        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
                vm.userId = $rootScope.currentUser._id;
                vm.username = $rootScope.currentUser.username;
            }
        }
        init();
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/");
                        vm.flag = 0;
                    },
                    function () {
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo);
                        vm.flag = 1;
                    }
                )
        }
    }
})();