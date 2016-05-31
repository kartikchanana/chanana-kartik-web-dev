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
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function updatePage(pageId, newPage) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages[i].name = newPage.name;
                    pages[i].title = newPage.title;
                    return true;
                }
            }
        }

        function createPage(websiteId, name, title) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                websiteId: websiteId
            };
            pages.push(newPage);
            return newPage;
        }


        function deletePage(pageId) {
            for(var i in pages) {
                if(pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
        
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
            for (var i in pages){
                if(pages[i]._id === pageId){
                    return(pages[i]);
                }
            }
            return null;
        }
        
        
    }
})();