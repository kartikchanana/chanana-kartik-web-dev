(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    
    // Implement the service
    function PageService($http) {
        var api = {
            // CRUD operations
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        //Create a new page
        function createPage(websiteId, name, title) {
            var newPage = {
                name: name,
                title: title
            };
            console.log(newPage);
            return $http.post("/api/website/" +websiteId+ "/page", newPage);
        }

        function findPageByWebsiteId(websiteId){
            var url = "/api/website/" +websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId){
            var url = "/api/page/" +pageId;
            return $http.get(url);
        }
        
        function updatePage(pageId, newPage) {
            var url = "/api/page/" +pageId;
            return $http.put(url, newPage);
        }
        
        function deletePage(pageId) {
            var url = "/api/page/" +pageId;
            return $http.delete(url);
        }
        
        
        
        
    }
})();