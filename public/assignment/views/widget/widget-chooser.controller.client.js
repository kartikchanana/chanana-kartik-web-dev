(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        console.log(vm.pageId);
        console.log(vm.websiteId);
        console.log(vm.userId);
        vm.createHeading = createHeading;
        vm.createImage = createImage;
        vm.createYoutube= createYoutube;
        var header = "heading";
        var img = "image";
        var youtube = "youtube";
        
        function createHeading(){
            var newWidget = WidgetService.createWidget(vm.pageId, header);
            if(newWidget){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error("Unable to create heading widget");
            }
        }
        function createImage(){
            var newWidget = WidgetService.createWidget(vm.pageId, img);
            if(newWidget){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error("Unable to create image widget");
            }
        }
        function createYoutube(){
            var newWidget = WidgetService.createWidget(vm.pageId, youtube);
            if(newWidget){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                vm.error("Unable to create youtube widget");
            }
        }
    }
})();