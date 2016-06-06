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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(
                    function (response) {
                        vm.widget = response.data;
                    }
                )
        }
        init();

        vm.updateWidget = updateWidget;
        vm.deleteWidget= deleteWidget;

        function deleteWidget(widgetId)
        {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
        function updateWidget(widget)
        {
            WidgetService
                .updateWidget(widget,vm.widgetId)
                .then(function (response) {
                    vm.success = "Updated successfully";
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                });
        }
    }
})();