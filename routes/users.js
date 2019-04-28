const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../db/models/User");
const userController = require("../controllers/userController");

// Check for user
router.get("/user", userController.checkSession);

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
router.post("/users/register", userController.registerUser);

// Add a connection (friend, family, etc)
router.post("/users/add-connection", userController.addConnection);
// (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ msg: "Email required." });
//   }

//   if (email === req.user.email) {
//     return res
//       .status(400)
//       .json({ msg: "Hopefully you already feel connected to yourself :)" });
//   }

//   User.findOne({ email }, "_id").then(connectionId => {
//     if (!connectionId) {
//       return res.status(400).json({ msg: "There is no user with that email" });
//     }

//     User.findById(req.user._id).then(user => {
//       // Instance method on user model
//       // Utilizes addToSet to prevent duplicates
//       user.addConnection(connectionId._id);
//       // connectionId.addConnection(user._id);
//       user
//         .save()
//         .then(() => {
//           console.log("Connection added");
//           res.status(200).end();
//         })
//         .catch(err => {
//           console.log("Failed to make connection");
//           res.status(400).json(err);
//         });
//     });
//   });
// });

// Get connections
router.get("/users/connections", userController.getConnections);
// (req, res) => {
//   User.findById(req.user._id)
//     .getConnections()
//     .then(connections => {
//       res.status(200).json(connections);
//     })
//     .catch(err => {
//       console.log("Failed to retrieve connections");
//       res.status(400).json(err);
//     });
// });

// Logout user out
router.get("/users/logout", userController.logout);
// (req, res) => {
//   req.logout();
//   console.log("Logout Success");
//   res.json(null);
// });

module.exports = router;
