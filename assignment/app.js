module.exports= function(app, mongoose, db) {

    var models = require("./models/models.server.js")(mongoose, db);


    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
};