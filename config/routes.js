module.exports = app => {
  const indexRoute = require("../routes/index");

  app.use(indexRoute);
};
