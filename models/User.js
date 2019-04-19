const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lists: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShoppingList" }],
    default: undefined
  },
  connections: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: undefined
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(plainpass, callback) {
  return callback(null, bcrypt.compareSync(plainpass, this.password));
};

const User = mongoose.model("User", userSchema);

module.exports = User;
