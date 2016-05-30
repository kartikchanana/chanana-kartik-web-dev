(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    
    function PageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        
        function init(){
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
})();