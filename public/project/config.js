(function(){
    angular
        .module("NoteScorer")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/results/:searchText/:pageNo/sheet/:noteId/:noteSecret/:sheetNo", {
                templateUrl: "views/sheets/sheet.view.client.html",
                controller: "SheetController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/results/sheet/:noteId", {
                templateUrl: "views/sheets/sheet-edit.view.client.html",
                controller: "SheetEditController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/results/ownsheet/:noteId", {
                templateUrl: "views/sheets/ownsheet.view.client.html",
                controller: "OwnSheetController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/sheet/new", {
                templateUrl: "views/sheets/sheet-new.view.client.html",
                controller: "NewSheetController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/results/:searchText/:pageNo", {
                templateUrl: "views/sheets/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/results/:searchText/:number/:pageNo", {
                templateUrl: "views/sheets/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/checkProfile/:username/:userId", {
                templateUrl: "views/user/profile-checkout.view.client.html",
                controller: "ProfileCheckoutController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn1
                }
            });

        function checkLoggedIn1($rootScope, UserService, $location, $q) {

            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0'){
                            deferred.resolve();
                        }else{
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/");
                    }
                );
            return deferred.promise;
        }
        function checkLoggedIn($rootScope, UserService, $location, $q) {

            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if(user == '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }else{
                            $rootScope.currentUser = user;
                            deferred.resolve();

                        }
                    },
                    function (err) {
                        $location.url("/");
                    }
                );
            return deferred.promise;
        }
    }
})();