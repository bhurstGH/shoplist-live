require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const app = express();

// Pass passport to passport config file.
require("./config/passport")(passport);

// Express' built in Body-Parser middleware replacement
// Appends a body object on the request object as JSON.
app.use(express.json());

// MongoDB developer database URI
const db = process.env.MONGO_DEV_URI;

// Connect to the database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch(err => {
    console.log(err);
  });

// express-session
app.use(
  session({
    secret: "sllsecret",
    resave: false,
    saveUninitialized: true
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./config/routes")(app);

// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on ${PORT}`));
