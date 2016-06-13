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
        vm.createYoutube = createYoutube;
        vm.createHTML = createHTML;
        vm.createText = createText;
        var header = "heading";
        var img = "image";
        var youtube = "youtube";
        var html = "html";
        var text = "text";


        function createHeading(){
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    var length = response.data.length;
                    WidgetService
                        .createWidget(vm.pageId, header, length)
                        .then(function (response) {
                            var newWidget = response.data;
                            
                            if(newWidget){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                            }
                        }, function (error) {
                            console.log(error);
                        })
                });
        }
        function createHTML(){
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    var length = response.data.length;
                    WidgetService
                        .createWidget(vm.pageId, html, length)
                        .then(function (response) {
                            var newWidget = response.data;
                            
                            if(newWidget){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                            }
                        }, function (error) {
                            console.log(error);
                        })
                });
        }
        function createText(){
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    var length = response.data.length;
                    WidgetService
                        .createWidget(vm.pageId, text, length)
                        .then(function (response) {
                            var newWidget = response.data;
                            
                            if(newWidget){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                            }
                        }, function (error) {
                            console.log(error);
                        })
                });
        }

        function createImage(){
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    var length = response.data.length;
                    WidgetService
                        .createWidget(vm.pageId, img, length)
                        .then(function (response) {
                            var newWidget = response.data;

                            if(newWidget){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                            }
                        }, function (error) {
                            console.log(error);
                        })
                });
        }

        function createYoutube(){
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    var length = response.data.length;
                    WidgetService
                        .createWidget(vm.pageId, youtube, length)
                        .then(function (response) {
                            var newWidget = response.data;

                            if(newWidget){
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
                            }
                        }, function (error) {
                            console.log(error);
                        })
                });
        }
        }
})();