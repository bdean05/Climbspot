const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    enum: ["admin", "user"],
    type: String,
    default: "user"
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;