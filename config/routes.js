module.exports = (app, io) => {
  const userRoutes = require("../routes/users");
  const listRoutes = require("../routes/lists")(io);

  app.use(userRoutes);
  app.use(listRoutes);
};
