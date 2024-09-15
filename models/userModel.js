const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requied: [true, "Please add the username"],
    },
    email: {
      type: String,
      requied: [true, "Please add the email address"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      requied: [true, "Please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
