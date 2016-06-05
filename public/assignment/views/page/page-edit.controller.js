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
        vm.updatePage = updatePage;

        function updatePage(newPage){
            console.log("reached controller");
            PageService
                .updatePage(vm.pageId,newPage)
                .then(function (response) {
                    vm.success = "Updated successfully";
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                },function (error) {
                    vm.error = "Cannot update page";
                });
        }
        function init(){
            PageService
                .findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                });
        }
        init();
        function deletePage(pageId){
            PageService
                .deletePage(pageId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
    }
})();