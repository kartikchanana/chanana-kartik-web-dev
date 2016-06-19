(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite= updateWebsite;

        function init(){
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }
        init();
        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website");
                },function (error) {
                    vm.error="Unable to delete website"
                });
        }
        function updateWebsite(newWebsite) {
            if(!newWebsite.name){
                vm.error = "Website name required";
            }
            else {

                WebsiteService
                    .updateWebsite(vm.websiteId, newWebsite)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website")
                    }, function (error) {
                        vm.error = "Could not save profile"
                    });
            }
        }
    }
})();