(function(){
    angular
        .module("NoteScorer")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "index.html"
            })
            .when("/login", {
                templateUrl: "views/login.view.client.html"
            });
    }
})();