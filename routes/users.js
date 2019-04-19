const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

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

// Log user in
router.post(
  "/users/login",
  passport.authenticate("local", { failWithError: true }),
  (req, res) => {
    console.log("Login Success");
    res.json(req.user);
  },
  (err, req, res, next) => {
    console.log(req.authError);
    res.status(400).json({ msg: req.authError });
  }
);

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
  res.json(null);
});

module.exports = router;
