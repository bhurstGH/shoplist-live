const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [6, "Name must be at least 6 characters"],
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
    required: [true, "Password required"]
  },
  lists: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "ShoppingList" }],
    default: null
  },
  connections: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: null
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

// Encrypt password with bcrypt before saving
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods = {
  comparePassword(plainpass, callback) {
    return callback(null, bcrypt.compareSync(plainpass, this.password));
  },
  addList(id) {
    // Add list to user.
    if (this.lists === null) {
      return (this.lists = [id]);
    }

    return this.lists.addToSet(id);
  },
  addConnection(id) {
    // Add a connection
    if (this.connections === null) {
      return (this.connections = [id]);
    }

    return this.connections.addToSet(id);
  }
};

userSchema.statics = {
  async addListToUsers(idArray, listId) {
    // Add listId to users in idArray
    const listMembers = await User.find()
      .where("_id")
      .in(idArray)
      .cursor()
      .on("data", function(member) {
        member.lists.addToSet(listId);
        member.save();
      });
  }
};

userSchema.query = {
  getLists() {
    return this.select("lists").populate({
      path: "lists",
      populate: { path: "members", select: "email name" }
    });
  },

  getConnections() {
    // Get connections, returning only the id, email, and name to the client
    return this.select("connections").populate("connections", "email name");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
