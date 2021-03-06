(function () {
    angular
        .module("NoteScorer")
        .controller("SearchController", SearchController);

    function SearchController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;
        vm.count =[];
        
        //Function requests from view
        vm.searchNotes = searchNotes;
        vm.decreasePages = decreasePages;
        vm.increasePages = increasePages;
        vm.searchByNumber = searchByNumber;
        vm.logout = logout;
        vm.setUrl = setUrl;
        vm.searchNextPage = searchNextPage;
        //Data coming from URL
        vm.searchText = $routeParams.searchText;
        vm.pageNo = $routeParams.pageNo;
        vm.numberOfInst = $routeParams.number;
        vm.pages=[];

        //check if user logged in on-load and then 
        // load notes matching searched keyword
        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
            }
            var ps = Math.floor(vm.pageNo/5);
            var start = 5 * ps;
            vm.pages =[start+1,start+2,start+3,start+4,start+5];
            NoteService
                .findNotes(vm.searchText, vm.pageNo)
                .then(
                    function (response) {
                        vm.apiNotes = response.data;
                        if(vm.pageNo >= 1){
                            for (i = 0; i < vm.apiNotes.length; i++) {
                                var part = vm.apiNotes[i].metadata.parts; //array of instruments
                                var len = part.length;
                                if (vm.count.indexOf(len) == -1) {
                                    vm.count.push(len);
                                }}
                        }else if(vm.pageNo == 0){
                            NoteService
                                .findOwnNotes(vm.searchText)
                                .then(
                                    function (response) {
                                        vm.apiNotes = vm.apiNotes.concat(response.data);
                                        for (i = 0; i < vm.apiNotes.length; i++) {
                                            var part = vm.apiNotes[i].metadata.parts; //array of instruments
                                            var len = part.length;
                                            if (vm.count.indexOf(len) == -1) {
                                                vm.count.push(len);
                                            }}
                                    }
                                );
                        }
                    }
                );
        }
        init();

        //Logout the current user
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo);
                        vm.flag = 0;
                    },
                    function () {
                        $location.url("/results/" + vm.searchText + "/" + vm.pageNo);
                        vm.flag = 1;
                    }
                )
        }

        //Internal rerouting
        function setUrl() {
            var prevUrl = "/results/"+ vm.searchText + "/" + vm.pageNo;
            $rootScope.prevUrl = prevUrl;
        }
        
        //Load scores filtered by number of instruments
        function searchByNumber(number, page) {
            $location.url("/results/"+vm.searchText+ "/" +number +"/" +page);
        }
        
        //Search scores by page number
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText+ "/" +page);
        }
        
        //Load next page
        function searchNextPage(page) {
            $location.url("/results/"+vm.searchText+ "/" +page);
        }

        //For paginating next
        function increasePages() {
            var earlierPages = vm.pages;
            var largest = Math.max.apply(Math, earlierPages);
            if(largest < 25){
                var newPages=[];
                for(i=1;i<6;i++){
                    newPages.push(largest + i);
                }
                vm.pages = newPages;
                searchNextPage(largest + 1);
            }

        }

        //For paginating previous
        function decreasePages() {
            var earlierPages = vm.pages;
            var smallest = Math.min.apply(Math, earlierPages);
            if(smallest <5) {
                vm.pages=[1,2,3,4,5];
                searchNextPage(1);
            }else{
                var newPages=[];
                for(i=5;i>0;i--){
                    newPages.push(smallest - i);
                }
                vm.pages = newPages;
                searchNextPage(smallest - 5);
            }

        }
    }

})();