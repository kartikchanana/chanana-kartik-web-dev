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
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();
        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(vm.websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
        function updateWebsite(newWebsite) {
            WebsiteService.updateWebsite(vm.websiteId,newWebsite);
        }
    }
})();