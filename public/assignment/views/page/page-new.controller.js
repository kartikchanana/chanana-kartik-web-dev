(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);
    
    function PageNewController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function createPage(name, title) {
            var newPage = PageService.createPage(vm.websiteId, name, title);
            if(newPage) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to create page";
            }
        }
    }
})();