(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.widgetId = $routeParams.widgetId;
        
        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget= deleteWidget;

        function deleteWidget(widgetId)
        {
            var result = WidgetService.deleteWidget(vm.widgetId);
            if(result)
            {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else
                vm.error="unable to delete";

        }
        function updateWidget(widget)
        {
            var result = WidgetService.updateWidget(widget,vm.widgetId);

            if(result)
            {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else
                vm.error="unable to update";

        }
    }
})();