require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
});

store.on("error", err => console.log(err));

// Pass passport to passport config file.
require("./config/passport")(passport);

// Express' built in Body-Parser middleware replacement
// Appends a body object on the request object as JSON.
app.use(express.json());

// MongoDB developer database URI
const db = process.env.MONGO_URI;

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
    store: store,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 }
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./config/routes")(app);

//Serve static assets from client if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server listening on ${PORT}`));
