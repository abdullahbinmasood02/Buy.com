const AppError = require("../utils/appError");

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
}

function sendCastErrorDB(err) {
  const message = `invalid value ${err.value} for path ${err.path} provided`;
  const errorCode = 404;
  return new AppError(message, errorCode);
}

function sendDupKeyErrorDb(err, res) {
  const message = `duplicate value ${err.keyValue.name} provided`;
  const code = 404;
  return new AppError(message, code);
}

function handleValidationErrorDb(err, res) {
  const message = Object.values(err.errors)
    .map((validatorErr) => validatorErr.message)
    .join(",");
  return new AppError(message, 404);
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") {
      error = sendCastErrorDB(error);
    } else if (error.code === 11000) error = sendDupKeyErrorDb(error, res);
    else if (err.name === "ValidationError")
      error = handleValidationErrorDb(error, res);
    sendErrorProd(error, res);
  }

  if (process.env.NODE_ENV === "development") {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    sendErrorDev(err, res);
  }
};
