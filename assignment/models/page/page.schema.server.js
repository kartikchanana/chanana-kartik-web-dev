module.exports = function (mongoose) {

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref: "Website"},
        name: String,
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now }
    }, {collection: "Page"});

    return PageSchema;
};