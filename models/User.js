const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/twinder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var userSchema = mongoose.Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    birthday: String,
    pic: String
});

module.exports = mongoose.model('User', userSchema);
