(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            WebsiteService
                .createWebsite(vm.userId, name, description)
                .then(function (response) {
                    var website = response.data;
                    if(website){
                        $location.url("/user/"+website._user+"/website");
                    }
                });
        }
    }
})();