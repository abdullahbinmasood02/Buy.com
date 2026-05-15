const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
  },

  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "please provide your password"],
  },
  photo: { type: String },

  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password is not the same",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(this.password, 12);

  this.password = hashedPassword;
  this.passwordConfirm = undefined;
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
