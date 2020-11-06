const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your firstname."],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide your lastname."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
    loadClass: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: { type: String, default: "default.jpg" },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Please provide a password"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide a confirmPassword"],
    minlength: 8,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passowrd does not match.",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "visitor"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
});

// document middleware
// hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

// set password changed at property
userSchema.pre("save", function (next) {
  if (!this.isModified || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// query middleware
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// methods
// check passwords match
userSchema.methods.checkPassword = async function (inputPass, dbPass) {
  return await bcrypt.compare(inputPass, dbPass);
};

// create a reset token for password reset
userSchema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 60 * 1000;
  console.log({ token }, this.passwordResetToken);
  return token;
};

// check if password changed after the token has issued
userSchema.methods.checkPassAfterToken = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const convert = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return jwtTimeStamp < convert;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
