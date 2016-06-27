module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        facebook: {
          token: String,
            id: String,
            displayName: String

        },
        lastName: String,
        email: String,
        composed: [String],
        liked: [String],
        followed: [String],
        dateCreated: {type: Date, default: Date.now }
    }, {collection: "User"});

    return UserSchema;
};