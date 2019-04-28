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
  }
};
