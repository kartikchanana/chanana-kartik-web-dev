//has all the databases
module.exports = function(mongoose) {
    
        var models = {
            userModel: require("./user/user.model.server")(),
            noteModel: require("./note/note.model.server")()
    };
    return models;
};