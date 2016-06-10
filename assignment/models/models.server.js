//has all the databases
module.exports = function(mongoose, db) {
    
        var models = {
        userModel: require("./user/user.model.server")(mongoose)
        // TODO: add all the toher models: websiteModel, pageModel, widgetModel
    };
    return models;
};