const express = require("express");
const itemRouter = require("./routes/itemRoute");
const AppError = require("./utils/appError");
const globalErrorController = require("./controllers/errorController");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/items", itemRouter);
app.use("/api/v1/users", userRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`route ${req.originalUrl} not found on this server`));
});

app.use(globalErrorController);

module.exports = app;
