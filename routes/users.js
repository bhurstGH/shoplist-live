const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

// Check for user
router.get("/user", userController.getUser);

// Log user in
// Could not delegate this out to the controller for some reason.
// Multiple implementations attempted. Leaving it here for time's sake.
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
router.post("/users/register", userController.registerUser);

// Add a connection (friend, family, etc)
router.post("/users/add-connection", userController.addConnection);

// Get connections
router.get("/users/connections", userController.getConnections);

// Logout user out
router.get("/users/logout", userController.logout);

module.exports = router;
