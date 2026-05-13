const express = require("express");
const itemRouter = require("./routes/itemRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/api/v1/items", itemRouter);

module.exports = app;
