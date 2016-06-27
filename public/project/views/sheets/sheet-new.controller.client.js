(function () {
    angular
        .module("NoteScorer")
        .controller("NewSheetController", NewSheetController);
    
    function NewSheetController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;
        
        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
                vm.userId = $rootScope.currentUser._id;
                vm.username = $rootScope.currentUser.username;
                console.log("username: " +vm.username)
            }
        }
        init();
        
    }
})();