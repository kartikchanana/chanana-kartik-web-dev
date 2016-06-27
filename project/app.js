module.exports= function(app, mongoose) {

    var models = require("./models/models.server.js")(mongoose);


    require("./services/user.service.server.js")(app, models);
    require("./services/note.service.server.js")(app, models);
    // require("./services/widget.service.server.js")(app, models);
    // require("./services/page.service.server.js")(app, models);
};