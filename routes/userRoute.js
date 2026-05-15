const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

userRouter.post("/signup", authController.signup);
userRouter.route("/").get(userController.getAllUsers);

module.exports = userRouter;
