require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passportConfig = require("./config/passportConfig");
const routesConfig = require("./config/routesConfig");
const mongoose = require("mongoose");
const path = require("path");

const server = require("http").Server(app);
const io = require("socket.io")(server);

// Express' built in Body-Parser middleware replacement
// Appends a body object on the request object as JSON.
app.use(express.json());

// MongoDB developer database URI
const db = process.env.MONGO_TEST;

// Connect to the database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Test connected.");
  })
  .catch(err => {
    console.log(err);
  });

// express-session
app.use(
  session({
    secret: "sllsecret",
    resave: false,
    saveUninitialized: false
  })
);

// Initialize passport after session
passportConfig(app);

// Routes
routesConfig(app, io);

//Serve static assets from client if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Test server listening on ${PORT}`));
