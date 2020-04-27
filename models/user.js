const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const userSchema new Schema({
    username: String,
    email: String,
    password: String,
    favorite: [{
        name: String,
        descrpt: String,
        comment: [String],
        id_tag: [{
            type: Schema.Types.Object,
            ref: "Tag"
        }]
    }]

})

const User = mongoose.model("User", userSchema);
module.exports = User;