const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

// Log user in
router.post(
  "/users/login",
  passport.authenticate("local", { failWithError: true }),
  // Successful login
  (req, res) => {
    const { name, email, _id } = req.user;
    console.log("Login Success");
    res.status(200).json({ name, email, id: _id });
  },
  // Login failure
  (err, req, res, next) => {
    console.log(err);
    console.log(req.authError);
    res.status(400).json({ msg: req.authError });
  }
);

// Register new user
router.post("/users/register", (req, res) => {
  const { name, email, password, confirmpass } = req.body;

  if (!name || !email || !password || !confirmpass) {
    return res.status(400).json({ msg: "All fields required." });
  }

  if (password !== confirmpass) {
    return res.status(400).json({ msg: "Passwords do not match." });
  }

  // Query to check if the email is already in use
  User.findOne({ email }, "email").then(query => {
    if (query) {
      return res.status(400).json({ msg: "Email is already in use" });
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
        res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email
        });
      })
      .catch(err => {
        let { message } =
          err.errors.name || err.errors.email || err.errors.password;
        res.status(400).json({ msg: message });
      });
  });
});

// Add a connection (friend, family, etc)
router.post("/users/add-connection", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ msg: "Email required." });
  }

  if (email === req.user.email) {
    return res
      .status(400)
      .json({ msg: "Hopefully you already feel connected to yourself :)" });
  }

  User.findOne({ email }, "_id").then(connectionId => {
    if (!connectionId) {
      return res.status(400).json({ msg: "There is no user with that email" });
    }

    User.findById(req.user._id).then(user => {
      // Instance method on user model
      // Utilizes addToSet to prevent duplicates
      user.addConnection(connectionId._id);
      user
        .save()
        .then(() => {
          console.log("Connection added");
          res.status(200).end();
        })
        .catch(err => {
          console.log("Failed to make connection");
          res.status(400).json(err);
        });
    });
  });
});

// Get connections
router.get("/users/connections", (req, res) => {
  User.findById(req.user._id)
    .getConnections()
    .then(connections => {
      res.status(200).json(connections);
    })
    .catch(err => {
      console.log("Failed to retrieve connections");
      res.status(400).json(err);
    });
});

// Logout user out
router.get("/users/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  console.log("Logout Success");
  res.json(null);
});

module.exports = router;
