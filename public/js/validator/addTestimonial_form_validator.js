(() => {
  const validation = new JustValidate("#addTestimonial_form", {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      fontSize: "14px",
      color: "#dc3545",
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
    .addField("#clientName", [
      {
        rule: "required",
        errorMessage: "Name cannot be empty",
      },
      {
        rule: "minLength",
        value: 4,
        errorMessage: "Should be of min 4 characters long",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z ]+$/,
        errorMessage: "Name can not have special characters",
      },
    ])
    .addField("#docName", [
      {
        rule: "required",
        errorMessage: "Name cannot be empty",
      },
      {
        rule: "minLength",
        value: 4,
        errorMessage: "Should be of min 4 characters long",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z ]+$/,
        errorMessage: "Name can not have special characters",
      },
    ])
    .addField("#hospitalName", [
      {
        rule: "required",
        errorMessage: "Name cannot be empty",
      },
      {
        rule: "minLength",
        value: 4,
        errorMessage: "Should be of min 4 characters long",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z0-9 ]+$/,
        errorMessage: "Can have special characters & numbers only",
      },
    ])
    .addField("#treatment", [
      {
        rule: "required",
        errorMessage: "Treatment cannot be empty",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Should be of min 4 characters long",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z0-9 ]+$/,
        errorMessage: "Can have special characters & numbers only",
      },
    ])
    .addField("#rich_text_editor", [
      {
        rule: "required",
        errorMessage: "Please enter some details",
      },
    ])
    .addField("#city", [
      {
        rule: "required",
        errorMessage: "City can not be empty",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Must be of min 3 characters",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z0-9 ]+$/,
        errorMessage: "Can have special characters & numbers only",
      },
    ])
    .addField("#state", [
      {
        rule: "required",
        errorMessage: "Please select state",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z0-9 ]+$/,
        errorMessage: "Can have special characters & numbers only",
      },
    ])
    .addField("#clientCountry", [
      {
        rule: "required",
        errorMessage: "Please select client's country",
      },
      {
        rule: "customRegexp",
        value: /^[a-zA-Z0-9 ]+$/,
        errorMessage: "Can have special characters & numbers only",
      },
    ])
    .addField("#clientImg", [
      {
        rule: "minFilesCount",
        value: 1,
        errorMessage: "Please select a file",
      },
      {
        rule: "maxFilesCount",
        value: 1,
        errorMessage: "Please select a file",
      },
      {
        rule: "files",
        value: {
          files: {
            extensions: ["jpeg", "jpg", "png", "JPEG", "JPG", "PNG"],
            minSize: 10000,
            maxSize: 100000,
            types: ["image/jpeg", "image/jpg", "image/png"],
          },
        },
        errorMessage: "File should be image only of size 10 - 100kb",
      },
    ])
    .onSuccess((ev) => {
      ev.target.submit();
    });
})();
