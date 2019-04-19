const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

// Register new user
router.post("/users/register", (req, res) => {
  const { name, email, password, confirmpass } = req.body;

  if (password !== confirmpass) {
    return res.status(400).json({ msg: "Passwords do not match." });
  }

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    User.create({
      name,
      email,
      password
    })
      .then(user => {
        res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
});

// Log user in
router.post("/users/login", passport.authenticate("local"), (req, res) => {
  console.log("Login Success");
  res.json(req.user);
});

// Get current user
router.get("/user", (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json(null);
  }
});

// Logout user out
router.get("/users/logout", (req, res) => {
  req.logout();
  console.log("Logout Sucess");
  res.json({ user: null });
});

module.exports = router;
