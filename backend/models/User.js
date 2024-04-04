const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};
module.exports = model("User", userSchema);
