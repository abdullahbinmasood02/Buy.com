const itemModel = require("./../models/itemModel");
const express = require("express");
const itemController = require("./../controllers/itemController");

const itemRouter = express.Router();

itemRouter
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.postItem);
itemRouter
  .route("/:id")
  .get(itemController.getItem)
  .patch(itemController.updateItem)
  .delete(itemController.deleteItem);

module.exports = itemRouter;
