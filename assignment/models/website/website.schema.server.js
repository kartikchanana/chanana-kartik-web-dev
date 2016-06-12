module.exports = function (mongoose) {
  var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "website"});

    return WebsiteSchema;
};