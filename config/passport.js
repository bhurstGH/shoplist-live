const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Retrieve User
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false);
          }

          return done(null, user);
        })
        .catch(err => {
          done(err);
        });
    })
  );

  passport.serializeUser((id, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err.user);
    });
  });
};
