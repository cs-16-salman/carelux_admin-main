const addTestimonialSchema = {
  clientName: {
    notEmpty: true,
    errorMessage: "Client Name cannot be empty",
  },

  docName: {
    notEmpty: true,
    errorMessage: "Doctor Name cannot be empty",
  },

  hospitalName: {
    notEmpty: true,
    errorMessage: "Hospital Name cannot be empty",
  },

  treatment: {
    notEmpty: true,
    errorMessage: "Treatment cannot be empty",
  },

  testimony: {
    notEmpty: true,
    errorMessage: "Testimony cannot be empty",
  },

  city: {
    notEmpty: true,
    errorMessage: "City cannot be empty",
  },

  state: {
    notEmpty: true,
    errorMessage: "State cannot be empty",
  },

  clientCountry: {
    notEmpty: true,
    errorMessage: "Client Country cannot be empty",
  },
};

module.exports = addTestimonialSchema;
