(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);
    
    function PageNewController($location, $routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        console.log(userId);
        console.log(websiteId);

        function createPage(name, title) {
            var newPage = PageService.createPage(vm.websiteId, name, title);
            console.log(newPage);
            if(newPage) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to create page";
            }
        }
        
    }
})();