module.exports = function (app) {
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function deletePage(req,res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                pages[i].title = newPage.title;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
    function findPageById(req,res) {
        var pageId = req.params.pageId;
        for(var i in pages){
            if(pages[i]._id === pageId){
                res.send(pages[i]);
                return;
            }
        }
    }
    function createPage(req, res){
        var page = req.body;
        pages.push(page);
        res.send(page);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var resultSet = [];
        for (var i in pages){
            if(pages[i].websiteId === websiteId){
                resultSet.push(pages[i]);
            }
        }
        res.json(resultSet);
        return;
    }
};