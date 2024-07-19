(() => {
  const validation = new JustValidate("#addDoctor_form", {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      fontSize: "14px",
      color: "#dc3545",
    },
    focusInvalidField: true,
    lockForm: true,
  });

  validation
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
    ])
    .addField("#specialization", [
      {
        rule: "required",
        errorMessage: "Specialization cannot be empty",
      },
    ])
    .addField("#contactNum", [
      {
        rule: "required",
        errorMessage: "Contact number cannot be empty",
      },
      {
        rule: "number",
        value: 8,
        errorMessage: "Should be numbers only",
      },
      {
        rule: "minLength",
        value: 8,
        errorMessage: "Should be of min 8 characters long",
      },
      {
        rule: "maxLength",
        value: 12,
        errorMessage: "Should be of max 12 characters long",
      },
    ])
    .addField("#rich_text_editor", [
      {
        rule: "required",
        errorMessage: "Please enter some details",
      },
    ])
    .addField("#docCity", [
      {
        rule: "required",
        errorMessage: "City can not be empty",
      },
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Must be of min 3 characters",
      },
    ])
    .addField("#docState", [
      {
        rule: "required",
        errorMessage: "Please select state",
      },
    ])
    .addField("#docAvatar", [
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
