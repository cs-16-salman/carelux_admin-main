const bcrypt = require("bcrypt");

const {
  getUserByEmail,
  updateFailureAttempt,
  blockUser,
  resetFailureAttempt,
} = require("../repository/adminRepo");

const authenticateUser = async (email, password, done) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return done(null, false, { message: "Invalid email or password." });
  }

  try {
    if (user.is_blocked) {
      return done(null, false, {
        message: "User blocked, please contact your admin.",
      });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      user.failure_attempt += 1;
      updateFailureAttempt(user);

      if (user.failure_attempt === 5) {
        blockUser(user.id);
      }

      return done(null, false, { message: "Invalid email or password." });
    }
  } catch (error) {
    return done(error);
  }

  resetFailureAttempt(user.id);

  return done(null, user);
};

module.exports = authenticateUser;
