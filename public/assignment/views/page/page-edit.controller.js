(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);
    
    function PageEditController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        function init(){
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();
    }
})();