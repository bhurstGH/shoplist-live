const userQueries = require("../db/queries/userQueries");

module.exports = {
  checkSession(req, res, next) {
    if (req.user) {
      res
        .status(200)
        .json({ name: req.user.name, email: req.user.email, id: req.user._id });
    } else {
      res.status(400).json({ msg: "Bad stuff" });
    }
  },
  // See users.js route file
  //   login(req, res, next) {
  //     passport.authenticate("local", { failWithError: true }),
  //       // Successful login
  //       (req, res) => {
  //         const { name, email, _id } = req.user;
  //         console.log("Login Success");
  //         res.status(200).json({ name, email, id: _id });
  //       },
  //       // Login failure
  //       (err, req, res, next) => {
  //         console.log(err);
  //         console.log(req.authError);
  //         res.status(400).json({ msg: req.authError });
  //       };
  //   },
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
  },
  addConnection(req, res, next) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: "Email required." });
    }

    if (email === req.user.email) {
      return res
        .status(400)
        .json({ msg: "Hopefully you already feel connected to yourself :)" });
    }

    userQueries.createConnection(email, req.user._id, err => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).end();
      }
    });
  },
  getConnections(req, res, next) {
    userQueries.getConnections(req.user._id, (err, connections) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(connections);
      }
    });
  },
  logout(req, res, next) {
    req.logout();
    console.log("Logout Success");
    res.json(null);
  }
};
