const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.signup = catchAsync(async (req, res) => {
  let newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  newUser = await userModel.create(newUser);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: { newUser },
  });
});
