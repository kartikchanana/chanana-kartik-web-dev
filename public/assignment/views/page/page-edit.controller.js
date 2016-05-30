(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);
    
    function PageEditController($location, $routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.deletePage = deletePage;

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
        function deletePage(pageId){
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            } else {
                vm.error = "Unable to delete page";
            }
        }
    }
})();