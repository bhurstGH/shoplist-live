const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

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
        res.status(400);
      });
  });
});

router.post("/users/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.get("/users/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
