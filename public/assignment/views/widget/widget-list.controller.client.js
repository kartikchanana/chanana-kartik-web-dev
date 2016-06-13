(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidgets = reorderWidgets;

        function init() {
            WidgetService
                .findWidgetsForPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                });
            $(".container")
                .sortable({
                    axis:"y"
                });
        }
        init();

        function reorderWidgets(start,end)
        {
            console.log("WidgetListController");
            console.log(start);
            console.log(end);
            WidgetService
                .reorderWidgets(vm.pageId,start,end)
                .then(function(response)
                {
                    console.log(response.data);
                })
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }
    }
})();