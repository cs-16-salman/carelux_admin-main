const chngPwdSchema = {
  oldPassword: {
    notEmpty: true,
    errorMessage: "Password cannot be empty",
  },
  newPassword: {
    matches: {
      options: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!#_]).{8,}/],
      errorMessage: "Invalid new password",
    },
    custom: {
      options: (_newPwd, { req }) => {
        return _newPwd !== req.body.oldPassword;
      },
      errorMessage: "New password must be different",
    },
  },
  confirmPassword: {
    custom: {
      options: (_confirmPwd, { req }) => {
        return _confirmPwd === req.body.newPassword;
      },
      errorMessage: "Confirm password must match",
    },
  },
};

module.exports = chngPwdSchema;
