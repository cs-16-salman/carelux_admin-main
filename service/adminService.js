const fs = require("fs");
const bcrypt = require("bcrypt");

const adminRepo = require("../repository/adminRepo");

const updatePassword = async (req) => {
  if (!(await bcrypt.compare(req.body.oldPassword, req.user.password))) {
    console.log("Wrong password");
    return req.flash("error", "Wrong password");
  }

  try {
    const { newPassword } = req.body;
    const { id } = req.user;
    const encryptedPwd = await bcrypt.hash(newPassword, 10);
    adminRepo.updatePassword(encryptedPwd, id);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong");
  }
  req.flash("success", "Password updated successfully");
};

const getStatistics = async () => {
  const doctorsCount = await adminRepo.getDoctorsCount();
  const hospitalCount = await adminRepo.getHospitalCount();
  const testimonialCount = await adminRepo.getTestimonialCount();
  const inquiriesCount = await adminRepo.getInquiriesCount();
  return {
    doctorsCount,
    inquiriesCount,
    hospitalCount,
    testimonialCount,
  };
};

const addDoctor = async (req) => {
  if (!req.file) {
    req.flash("error", "Invalid file type.");
    return;
  }

  const file = req.file;
  const index = file.destination.indexOf("/", 2);
  const filePath = `${file.destination.substr(index)}/${file.filename}`;
  try {
    await adminRepo.addDoctor(req.body, filePath);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }

  req.flash("success", "Doctor details saved successfully.");
  return;
};

const updateDoctor = async (req) => {
  if (!req.body.doc_id) {
    req.flash("error", "Doctor id missing.");
    return;
  }

  try {
    let updateDoctor = {};
    const keyValue = Object.entries(req.body);
    for (const [key, value] of keyValue) {
      if (value) {
        updateDoctor[key] = value;
      }
    }

    if (req.file) {
      const file = req.file;
      const index = file.destination.indexOf("/", 2);
      const filePath = `${file.destination.substr(index)}/${file.filename}`;
      updateDoctor.avatar = filePath;
    }

    if (Object.keys(updateDoctor).length === 1) {
      req.flash("error", "Nothing to update.");
      return;
    }

    const doc = await adminRepo.getDoctor(updateDoctor.doc_id);
    if (!doc) {
      req.flash("error", "No such doctor found.");
      return;
    }

    if (updateDoctor.updateDocName) {
      doc.doc_name = updateDoctor.updateDocName;
    }
    if (updateDoctor.updateSpecialization) {
      doc.specialization = updateDoctor.updateSpecialization;
    }
    if (updateDoctor.updateContactNum) {
      doc.contact_num = updateDoctor.updateContactNum;
    }
    if (updateDoctor.updateDocDetails) {
      doc.details = updateDoctor.updateDocDetails;
    }
    if (updateDoctor.updateDocCity) {
      doc.city = updateDoctor.updateDocCity;
    }
    if (updateDoctor.updateDocState) {
      doc.state = updateDoctor.updateDocState;
    }
    if (updateDoctor.avatar) {
      doc.avatar = updateDoctor.avatar;
    }

    await adminRepo.updateDoctor(doc);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }

  req.flash("success", "Doctor details updated successfully.");
  return;
};

const getDoctorDetails = async () => {
  return await adminRepo.getDoctors();
};

const getDoctor = async (id) => {
  return await adminRepo.getDoctor(id);
};

const delDoctor = async (req) => {
  try {
    const id = req.body.doc_id;
    const doc = await getDoctor(id);
    await adminRepo.delDoctor(id);
    const path = `./public${doc.avatar}`;

    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }
  req.flash("success", "Doctor removed successfully");
  return;
};

const addHospital = async (req) => {
  if (!req.file) {
    req.flash("error", "Invalid file type.");
    return;
  }

  try {
    const file = req.file;
    const index = file.destination.indexOf("/", 2);
    const filePath = `${file.destination.substr(index)}/${file.filename}`;

    await adminRepo.addHospital(req.body, filePath);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }

  req.flash("success", "Hospital details saved successfully.");
  return;
};

const updateHospital = async (req) => {
  if (!req.body.hosp_id) {
    req.flash("error", "Hospital id missing.");
    return;
  }

  try {
    let updateHospital = {};
    const keyValue = Object.entries(req.body);
    for (const [key, value] of keyValue) {
      if (value) {
        updateHospital[key] = value;
      }
    }

    if (req.file) {
      const file = req.file;
      const index = file.destination.indexOf("/", 2);
      const filePath = `${file.destination.substr(index)}/${file.filename}`;
      updateHospital.image = filePath;
    }

    if (Object.keys(updateHospital).length === 1) {
      req.flash("error", "Nothing to update.");
      return;
    }

    const hosp = await adminRepo.getHospital(updateHospital.hosp_id);
    if (!hosp) {
      req.flash("error", "No such hospital found.");
      return;
    }

    if (updateHospital.updateHospName) {
      hosp.name = updateHospital.updateHospName;
    }
    if (updateHospital.updateHospNum) {
      hosp.contact_num = updateHospital.updateHospNum;
    }
    if (updateHospital.updateHospDetails) {
      hosp.details = updateHospital.updateHospDetails;
    }
    if (updateHospital.updateHospCity) {
      hosp.city = updateHospital.updateHospCity;
    }
    if (updateHospital.updateHospState) {
      hosp.state = updateHospital.updateHospState;
    }
    if (updateHospital.image) {
      hosp.img = updateHospital.image;
    }

    await adminRepo.updateHospital(hosp);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }

  req.flash("success", "Doctor details updated successfully.");
  return;
};

const getHospitals = async () => {
  return await adminRepo.getHospitals();
};

const getHospital = async (id) => {
  return await adminRepo.getHospital(id);
};

const delHospital = async (req) => {
  try {
    const id = req.body.hosp_id;
    const hosp = await getHospital(id);
    await adminRepo.delHospital(id);

    const path = `./public${hosp.img}`;
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }
  req.flash("success", "Hospital removed successfully");
  return;
};

const getTestimonials = async () => {
  return await adminRepo.getTestimonials();
};

const getTestimonial = async (id) => {
  return await adminRepo.getTestimonial(id);
};

const addTestimonial = async (req) => {
  if (!req.file) {
    req.flash("error", "Invalid image file type.");
    return;
  }

  try {
    const file = req.file;
    const index = file.destination.indexOf("/", 2);
    const filePath = `${file.destination.substr(index)}/${file.filename}`;

    await adminRepo.addTestimonial(req.body, filePath);
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }

  req.flash("success", "Testimonial saved successfully.");
  return;
};

const delTestimonial = async (req) => {
  try {
    const id = req.body.testimonial_id;
    const testimonial = await getTestimonial(id);
    await adminRepo.delTestimonial(id);

    const path = `./public${testimonial.img}`;
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }
  req.flash("success", "Testimonial removed successfully");
  return;
};

const getInquiries = async () => {
  return await adminRepo.getInquiries();
};

const getInquiry = async (id) => {
  return await adminRepo.getInquiry(id);
};

const getBusinessDetails = async () => {
  return await adminRepo.getBusinessDetails();
};

const updateBusinessDetail = async (req) => {
  try {
    const keyValue = Object.entries(req.body);
    const about = req.body.about;
    await adminRepo.updateBusinessDetail(keyValue);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!! Please try again.");
    return;
  }
  req.flash("success", "Business info updated successfully");
  return;
};

module.exports = {
  addDoctor,
  updateDoctor,
  getDoctorDetails,
  getDoctor,
  delDoctor,
  getStatistics,
  updatePassword,
  addHospital,
  updateHospital,
  getHospital,
  getHospitals,
  delHospital,
  getTestimonials,
  getTestimonial,
  addTestimonial,
  delTestimonial,
  getInquiries,
  getInquiry,
  getBusinessDetails,
  updateBusinessDetail,
};
