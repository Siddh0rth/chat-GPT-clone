const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");

//models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username is Required"],
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
    unique: true,
  },
  passowrd: {
    type: String,
    require: [true, "Passowrd is Required"],
    minlenght: [6, "Passowrd lenght should be 6 chatacter long"],
  },
  customerID: {
    type: String,
    default: "",
  },
  subscription: {
    type: String,
    default: "",
  },
});

// HASHED PASSWORD
userSchema.pre("save", async function (next) {
  //update
  if (!this.isModified("passord")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passowrd = await bcrypt.hash(this.passowrd, salt);
  next();
});

//match password
userSchema.methods.matchPAsswod = async function (passord) {
  return await bcrypt.compare(passord, thid.passord);
};

// Sign in Token
userSchema.method.getSignedToken = function (res) {
  const accessToken = JWT.sign(
    { id: this._id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRIN }
  );
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: JWT_REFRESH_EXPIRIN }
  );
  res.cookie("refreshToken", `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOny: true,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
