(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location,$routeParams,FlickrService) {
        var vm = this;

        vm.widgetId = $routeParams.widgetId;
        var widgetId=vm.widgetId;
        vm.pageId = $routeParams.pageId;
        var pageId = vm.pageaId;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.searchPhotos=searchPhotos;
        vm.selectPhoto=selectPhoto;

        function searchPhotos(searchText){
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;

                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var newWidget={
                _id: (new Date()).getTime()+"",
                widgetType: "IMAGE",
                pageId: pageId,
                url:url
            };
            FlickrService
                .selectPhoto( widgetId,newWidget)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId);
                },
                    function(response) {
                        vm.error="unable to update";
                    });
        }
    }
})();