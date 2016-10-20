(function () {
    angular
        .module("NoteScorer")
        .controller("HomeController", HomeController);
    
    
    function HomeController($rootScope, $location,$routeParams, UserService) {
        var vm = this;
        vm.logout = logout;
        vm.searchNotes = searchNotes;
        
        //Check logged in user on initialisation 
        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
                
            }else{
                vm.flag = 1;
                vm.userId = $rootScope.currentUser._id;
            }
        }
        init();

        //Search for notes acc to keyword on enter press
        $( "#searchBox" ).keypress(function(event) {
            if(event.which == 13 || event.keyCode == 13) {
                var tb = document.getElementById("searchBox").value;
                $location.url("/results/"+ tb + "/" + 0);
            }
            return true;
        });

        //Search for notes acc to keyword
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText + "/" + page);
        }

        //Logout the current user
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/");
                        vm.flag = 0;
                    },
                    function () {
                        vm.flag = 1;
                    }
                )
        }
        
    }

})();