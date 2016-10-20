module.exports= function(app, mongoose) {

    //Provide mongoose access to server model
    var models = require("./models/models.server.js")(mongoose);
    
    
    //Centralized access to server services
    require("./services/user.service.server.js")(app, models);
    require("./services/note.service.server.js")(app, models);
};