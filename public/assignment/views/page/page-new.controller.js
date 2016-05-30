(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);
    
    function PageNewController($location, $routeParams, PageService){
        var vm = this;
        vm.createPage = createPage;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        console.log(vm.userId);
        console.log(vm.websiteId);

        function createPage(name, title) {
            console.log("hello");
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