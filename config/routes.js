module.exports = app => {
  const indexRoute = require("../routes/index");
  const userRoutes = require("../routes/users");

  app.use(indexRoute);
  app.use(userRoutes);
};
