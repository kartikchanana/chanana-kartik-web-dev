module.exports = function (mongoose) {

    var NoteSchema = mongoose.Schema({
        apiId: Number,
        title: {type: String},
        description: String,
        license: {type: String, enum: ['all-rights-reserved', 'public']},
        metadata: {
            duration: Number,
            keysig: String,
            pages: Number,
            parts:String
        },
        comments: [{
            date: {type: Date, default: Date.now },
            username: String, //Check if Number required, it's for local user now
            comment: String
        }],
        secret: String,
        url: String,
        liker: [String],
        user: {
            uid: String,
            username: String
        },
        date: {type: Date, default: Date.now }
    }, {collection: "Note"});

    return NoteSchema;
};