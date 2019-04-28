const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../db/models/User");

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then(user => {
            req.authError = "Made it this far";
            if (!user) {
              req.authError = "Email is incorrect";
              return done(null, false);
            }

            user.comparePassword(password, (err, match) => {
              if (!match) {
                req.authError = "Passsword is incorrect";
                return done(null, false);
              }
            });
            return done(null, user);
          })
          .catch(err => {
            console.log(err);
            done(err, false);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
