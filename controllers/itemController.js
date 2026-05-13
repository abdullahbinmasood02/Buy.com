const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.getItem = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.getAllItems = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.postItem = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: null,
  });
});
