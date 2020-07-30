const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
// const secret = require("../config").secret;

const userSchema = new Schema(
  {
    // image: String,
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      maxlength: [128, "email can't be greater than 128 characters"],
      index: true
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minlength: [4, "first name can't be smaller than 4 characters"],
      maxlength: [64, "first name can't be greater than 64 characters"]
    },
    lastName: {
      type: String,
      required: [true, "firstName is required"],
      minlength: [4, "last name can't be smaller than 4 characters"],
      maxlength: [64, "last name can't be greater than 64 characters"]
    },
    aboutMe: String,
    password: String,
    role: {
      enum: ["admin", "user"],
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  let today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    },
    secret
  );
};

userSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    // image: this.image,
    firstName: this.firstName,
    lastName: this.lastName,
    aboutMe: this.aboutMe
  };
};

userSchema.plugin(uniqueValidator, { message: "is already taken." });

mongoose.model("User", userSchema);

userSchema.plugin(uniqueValidator, { message: "is already taken." });
const User = mongoose.model("User", userSchema);
module.exports = User;

// validates unique email
userSchema.path("email").validate(async email => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, "email already exists");
// encrypt password if value is changed
