(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    
    

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function updatePage(pageId, newPage) {
            var url = "/api/page/" +pageId;
            return $http.put(url, newPage);
        }

        function createPage(websiteId, name, title) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                title: title,
                websiteId: websiteId
            };
            return $http.post("/api/website/" +websiteId+ "/page", newPage);
        }


        function deletePage(pageId) {
            var url = "/api/page/" +pageId;
            return $http.delete(url);
        }
        
        function findPageByWebsiteId(websiteId){
            var url = "/api/website/" +websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId){
            var url = "/api/page/" +pageId;
            return $http.get(url);
        }
        
        
    }
})();