const addDoctorSchema = {
  docName: {
    notEmpty: true,
    errorMessage: "Name cannot be empty",
  },

  specialization: {
    notEmpty: true,
    errorMessage: "Specialization cannot be empty",
  },

  contactNum: {
    notEmpty: true,
    errorMessage: "Number cannot be empty",
  },

  docDetails: {
    notEmpty: true,
    errorMessage: "Details cannot be empty",
  },

  docCity: {
    notEmpty: true,
    errorMessage: "City cannot be empty",
  },

  docState: {
    notEmpty: true,
    errorMessage: "State cannot be empty",
  },
};

module.exports = addDoctorSchema;
