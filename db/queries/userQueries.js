const User = require("../models/User");
const passport = require("passport");

module.exports = {
  register(name, email, password, callback) {
    return User.findOne({ email }, "email").then(query => {
      if (query) {
        callback({ msg: "Email is already in use" });
      }

      // User model has a pre-save hook that automatically hashes password
      const newUser = new User({
        name,
        email,
        password
      });

      newUser
        .save()
        .then(user => {
          callback(null, {
            id: user._id,
            name: user.name,
            email: user.email
          });
        })
        .catch(err => {
          let { message } =
            err.errors.name || err.errors.email || err.errors.password;
          callback({ msg: message });
        });
    });
  },
  addConnection(email, userId, callback) {
    return User.findOne({ email }, "_id").then(connectionId => {
      if (!connectionId) {
        return callback({ msg: "There is no user with that email" });
      }

      User.findById(userId).then(user => {
        // Instance method on user model
        // Utilizes addToSet to prevent duplicates
        user.addConnection(connectionId._id);
        // connectionId.addConnection(user._id);
        user
          .save()
          .then(() => {
            console.log("Connection added");
            callback(null);
          })
          .catch(err => {
            console.log("Failed to make connection");
            callback(err);
          });
      });
    });
  },
  getConnections(userId, callback) {
    User.findById(userId)
      .getConnections()
      .then(connections => {
        return callback(null, connections);
      })
      .catch(err => {
        console.log("Failed to retrieve connections");
        callback(err, null);
      });
  }
};
