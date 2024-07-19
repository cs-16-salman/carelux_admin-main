(() => {
  const validation = new JustValidate("#chngpwd_form", {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      fontSize: "14px",
      color: "#dc3545",
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
    .addField("#oldPassword", [
      {
        rule: "required",
        errorMessage: "Old password required",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Should be of min 3 characters long",
      },
    ])
    .addField("#newPassword", [
      {
        rule: "required",
        errorMessage: "New password required",
      },
      {
        rule: "customRegexp",
        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!#_]).{8,}/,
        errorMessage:
          "Password must contain upper and lower case letters, numbers and [@ $ ! # _]",
      },
    ])
    .addField("#confirmPassword", [
      {
        rule: "required",
        errorMessage: "Confirm password required",
      },
      {
        validator: (value, fields) => {
          if (fields["#newPassword"] && fields["#newPassword"].elem) {
            const repeatPasswordValue = fields["#newPassword"].elem.value;
            return value === repeatPasswordValue;
          }

          return true;
        },
        errorMessage: "Passwords must match",
      },
    ])
    .onSuccess((ev) => {
      ev.target.submit();
    });
})();
