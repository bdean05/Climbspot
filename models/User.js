const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "Spot"
  }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;