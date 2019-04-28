const userQueries = require("../db/queries/userQueries");
const passport = require("passport");

module.exports = {
  checkSession(req, res, next) {
    console.log(req.user, "USER");
    if (req.user) {
      res
        .status(200)
        .json({ name: req.user.name, email: req.user.email, id: req.user._id });
    } else {
      res.json(null);
    }
  },
  registerUser(req, res, next) {
    const { name, email, password, confirmpass } = req.body;

    if (!name || !email || !password || !confirmpass) {
      return res.status(400).json({ msg: "All fields required." });
    }

    if (password !== confirmpass) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }

    // Query to check if the email is already in use
    userQueries.register(name, email, password, (err, user) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).json(user);
      }
    });
  }
};
