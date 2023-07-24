const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController");

//Router object
const router = express.Router();

//router object
// Register
router.post("/register", registerController);

//Login
router.post("/login", loginController);

//Logout
router.post("/logout", logoutController);

module.exports = router;
