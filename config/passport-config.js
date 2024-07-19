const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const { getUserById } = require("../repository/adminRepo");
const authenticateUser = require("../auth/admin-authentication");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    authenticateUser
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(async (user, done) =>
  done(null, await getUserById(user.id))
);

module.exports = passport;
