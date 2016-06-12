module.exports = function (app, models) {

    var websiteModel = models.websiteModel;

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];


    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;
        websiteModel
            .createWebsite(userId, website)
            .then(
                function(website) {
                    res.json(website);
                }
            );
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                }
            );
    }
    
    function findWebsiteById(req, res){
        var websiteId= req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
    }
        
    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var newWebsite =  req.body;
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    function deleteWebsite(req, res){
        var websiteId= req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};