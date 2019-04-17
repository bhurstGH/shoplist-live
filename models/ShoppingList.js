const mongoose = require("mongoose");

const listItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  purchased: Boolean,
  price: Number
});

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  items: {
    type: [listItemSchema],
    default: undefined
  }
});

const ShoppigList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
