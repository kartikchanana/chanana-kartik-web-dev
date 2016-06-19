module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        dateCreated: {type: Date, default: Date.now }
    }, {collection: "User"});

    return UserSchema;
};