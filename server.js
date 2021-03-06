require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passportConfig = require("./config/passportConfig");
const routesConfig = require("./config/routesConfig");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const server = require("http").Server(app);
const io = require("socket.io")(server);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions"
});

store.on("error", err => console.log(err));

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

server.listen(PORT, console.log(`Server listening on ${PORT}`));
