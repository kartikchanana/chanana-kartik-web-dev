(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];
    

    function PageService() {
        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            // updatePage: updatePage,
            // deletePage: deletePage
        };
        return api;

        function findPageByWebsiteId(websiteId){
            var resultSet = [];
            for (var i in pages){
                if(pages[i].websiteId === websiteId){
                    resultSet.push(pages[i]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId){
            var resultSet = [];
            for (var i in pages){
                if(pages[i]._id === pageId){
                    return(pages[i]);
                }
            }
        }
        // function deletePage(pageId) {
        //     for(var i in websites) {
        //         if(websites[i]._id === websiteId) {
        //             websites.splice(i, 1);
        //             return true;
        //         }
        //     }
        //     return false;
        // }
        //
        function createPage(websiteId, name, title) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                title: title,
                websiteId: websiteId
            };
            pages.push(newPage);
            return newPage;
        }
        //
        // function findWebsitesForUserId(userId) {
        //     var resultSet = [];
        //     for(var i in websites) {
        //         if(websites[i].developerId === userId) {
        //             resultSet.push(websites[i]);
        //         }
        //     }
        //     return resultSet;
        // }
    }
})();