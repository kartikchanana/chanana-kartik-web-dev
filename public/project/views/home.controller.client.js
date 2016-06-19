(function () {
    angular
        .module("NoteScorer")
        .controller("HomeController", HomeController);
    
    function HomeController($location,$routeParams, NoteService) {
        var vm = this;
        console.log("hello");
        
        vm.searchNotes = searchNotes;

        function searchNotes(searchText) {

            NoteService
                .findNotes(searchText)
                .then(
                    function (response) {
                        var notes = response.data;
                        console.log(notes);
                    }
                );
        }
    }

})();