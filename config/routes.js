module.exports = app => {
  const userRoutes = require("../routes/users");
  const listRoutes = require("../routes/lists");

  app.use(userRoutes);
  app.use(listRoutes);
};
