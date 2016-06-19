(function(){
    angular
        .module("NoteScorer")
        .factory("NoteService", NoteService);

    var cons_key = "gtQLEX3eqNiG7HBrhf3ZTfwZVqJVrfjy";
    var cons_secret = "5kXvjuHfEUAv9EUVbMdpYcvdQtwZA79E";
    var base = "http://api.musescore.com/services/rest";

    function NoteService($http) {
        var api = {
            findNotes: findNotes
        };
        return api;

        function findNotes(searchText) {
            var url = base + "/score.jsonp&oauth_consumer_key=" + cons_key + "&text=" + searchText;
            console.log(url);
            return $http.get(url);
        }
    }
})();