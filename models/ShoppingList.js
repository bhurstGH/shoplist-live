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
  members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: undefined
  },
  items: {
    type: [listItemSchema],
    default: undefined
  }
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
