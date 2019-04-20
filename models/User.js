const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [25, "Name must be no more than 25 characters"],
    required: [true, "Name required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email required"]
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [10, "Password must be no more than 10 characters"],
    required: [true, "Password required"]
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
