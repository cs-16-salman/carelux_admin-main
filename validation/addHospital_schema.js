const addHospitalSchema = {
  hospName: {
    notEmpty: true,
    errorMessage: "Name cannot be empty",
  },

  contactNum: {
    notEmpty: true,
    errorMessage: "Number cannot be empty",
  },

  hospDetails: {
    notEmpty: true,
    errorMessage: "Details cannot be empty",
  },

  hospCity: {
    notEmpty: true,
    errorMessage: "City cannot be empty",
  },

  hospState: {
    notEmpty: true,
    errorMessage: "State cannot be empty",
  },
};

module.exports = addHospitalSchema;
