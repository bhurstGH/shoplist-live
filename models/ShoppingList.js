const mongoose = require("mongoose");
const User = require("./User");

const listItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  purchased: Boolean
});

const shoppingListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: null
  },
  items: {
    type: [listItemSchema],
    default: null
  }
});

// If this is a new list, save this list to its members before saving
shoppingListSchema.pre("save", async function() {
  if (this.isNew) {
    User.addListToUsers(this.members, this._id);
  }
});

// shoppingListSchema.post("remove");

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
