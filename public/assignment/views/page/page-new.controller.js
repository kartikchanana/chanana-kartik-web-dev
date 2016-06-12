(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);
    
    function PageNewController($location, $routeParams, PageService){
        var vm = this;
        vm.createPage = createPage;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function createPage(name, title) {
            PageService
                .createPage(vm.websiteId, name, title)
                .then(function (response) {
                    var page = response.data;
                    console.log("page back at controller: " +page);
                    if(page){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    }
                });
        }
    }
})();