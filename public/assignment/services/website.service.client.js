(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite
        };
        return api;

        function updateWebsite(websiteId, newWebsite) {
            var url="/api/website/"+websiteId;
            return $http.put(url, newWebsite);
        }
        function findWebsiteById(websiteId){
            var url="/api/website/"+websiteId;
            return $http.get(url);
        }
        
        function deleteWebsite(websiteId) {
            var url = "/api/website/" +websiteId;
            return $http.delete(url);
        }
        
        function createWebsite(developerId, name, desc) {
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: desc,
                developerId: developerId
            };
            return $http.post("/api/user/" +developerId +"/website", newWebsite);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }
    }
})();