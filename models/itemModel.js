const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "item must have a name"],
    minlength: [5, "name cannot be less than 5 characters"],
    maxlength: [10, "name cannot be more than 10 characters"],
    unique: true,
  },

  description: {
    type: String,
    minlength: [10, "description cannot be less than 10 characters"],
    maxlength: [200, "description cannot be more than 200 characters"],
  },

  price: {
    type: Number,
    min: [0, "price cannot be less than 0"],
  },
});

const itemModel = mongoose.model("items", itemSchema);
module.exports = itemModel;
