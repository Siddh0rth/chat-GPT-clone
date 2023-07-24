const errorHandler = require("../middleware/errorMiddleware");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
//JWT Token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    succes: true,
    token,
  });
};

//Register
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, passowrd } = req.body;
    //chech if user exist with that email or existing user
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is alredy resgister", 500));
    }
    const user = await userModel.create({ username, email, passowrd });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Login
exports.loginController = async (req, res, next) => {
  try {
    const { email, passowrd } = req.body;
    //Validation
    if (!email || !passowrd) {
      return next(new errorResponse("Provide Valid email or passowrd"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credential", 401));
    }
    const isMatch = await userModel.matchPAsswod(passowrd);
    if (!isMatch) {
      return next(new errorHandler("Invalid Credential", 401));
    }
    //res
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Logout
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
