(function () {
    angular
        .module("NoteScorer")
        .controller("SearchController", SearchController);

    function SearchController($location,$routeParams, NoteService, UserService, $rootScope) {
        var vm = this;
        vm.count =[];
        vm.searchNotes = searchNotes;
        vm.decreasePages = decreasePages;
        vm.increasePages = increasePages;
        vm.searchByNumber = searchByNumber;
        vm.logout = logout;
        vm.setUrl = setUrl;
        vm.searchText = $routeParams.searchText;
        vm.searchNextPage = searchNextPage;
        vm.pageNo = $routeParams.pageNo;
        vm.numberOfInst = $routeParams.number;
        vm.pages=[1,2,3,4,5];

        function init() {
            if($rootScope.currentUser == null){
                vm.flag = 0;
            }else{
                vm.flag = 1;
            }
            NoteService
                .findNotes(vm.searchText, vm.pageNo)
                .then(
                    function (response) {
                        vm.apiNotes = response.data;
                        NoteService
                            .findOwnNotes(vm.searchText)
                            .then(
                                function (response) {
                                    vm.apiNotes = vm.apiNotes.concat(response.data);
                                    console.log(vm.apiNotes);
                                    for (i = 0; i < vm.apiNotes.length; i++) {
                                            var part = vm.apiNotes[i].metadata.parts; //array of instruments
                                    var len = part.length;
                                    if (vm.count.indexOf(len) == -1) {
                                        vm.count.push(len);
                                    }

                                }
                                }
                            );
                    }
                );
        }
        init();

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

        function setUrl() {
            var prevUrl = "/results/"+ vm.searchText + "/" + vm.pageNo;
            $rootScope.prevUrl = prevUrl;
        }
        function searchByNumber(number, page) {
            $location.url("/results/"+vm.searchText+ "/" +number +"/" +page);
        }
        function searchNotes(searchText, page) {
            $location.url("/results/"+searchText+ "/" +page);
        }
        function searchNextPage(page) {
            $location.url("/results/"+vm.searchText+ "/" +page);
        }

        function increasePages() {
            var earlierPages = vm.pages;
            var largest = Math.max.apply(Math, earlierPages);
            if(largest < 25){
                var newPages=[];
                for(i=1;i<6;i++){
                    newPages.push(largest + i);
                }
                console.log(newPages);
                vm.pages = newPages;
                searchNextPage(largest + 1);
            }

        }

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
                console.log(newPages);
                vm.pages = newPages;
                searchNextPage(smallest - 5);
            }

        }
    }

})();