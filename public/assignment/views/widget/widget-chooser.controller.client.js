(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.createHeading = createHeading;
        vm.createImage = createImage;
        vm.createYoutube= createYoutube;
        var header = "heading";
        var img = "image";
        var youtube = "youtube";
        
        function createHeading(){
            WidgetService
                .createWidget(vm.pageId, header)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
        function createImage(){
            WidgetService
                .createWidget(vm.pageId, img)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
        function createYoutube(){
            WidgetService
                .createWidget(vm.pageId, youtube)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
    }
})();