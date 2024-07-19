const connection = require("../config/database");

const getUserByEmail = async (email) => {
  const [results] = await connection.execute(
    "SELECT * FROM admin_user WHERE email = ?",
    [email]
  );

  if (results.length === 0) {
    return null;
  }

  const [adminUser] = results;
  return adminUser;
};

const getUserById = async (id) => {
  const [results] = await connection.execute(
    "SELECT * FROM admin_user WHERE id = ?",
    [id]
  );

  if (results.length === 0) {
    return null;
  }

  const [adminUser] = results;
  return adminUser;
};

const blockUser = (id) => {
  connection.execute(
    "UPDATE admin_user SET failure_attempt = 0, is_blocked = 1 WHERE id = ?",
    [id]
  );
};

const updateFailureAttempt = (user) => {
  connection.execute("UPDATE admin_user SET failure_attempt = ? WHERE id = ?", [
    user.failure_attempt,
    user.id,
  ]);
};

const resetFailureAttempt = (id) => {
  connection.execute("UPDATE admin_user SET failure_attempt = 0 WHERE id = ?", [
    id,
  ]);
};

const getDoctorsCount = async () => {
  const [count] = await connection.execute(
    "SELECT count(*) AS totalCount FROM doctor_detail"
  );
  return count.pop().totalCount;
};

const getInquiriesCount = async () => {
  const [count] = await connection.execute(
    "SELECT count(*) AS totalCount FROM inquiry"
  );
  return count.pop().totalCount;
};

const addDoctor = async (doctorDetails, avatarPath) => {
  await connection.execute(
    `INSERT INTO doctor_detail (doc_name, specialization, contact_num, details, city, state, avatar) 
    VALUES (?,?,?,?,?,?,?)`,
    [
      doctorDetails.docName,
      doctorDetails.specialization,
      doctorDetails.contactNum,
      doctorDetails.docDetails,
      doctorDetails.docCity,
      doctorDetails.docState,
      avatarPath,
    ]
  );
};

const updateDoctor = async (doctor) => {
  const fieldsToUpdate = [];
  const data = [];
  const keyValue = Object.entries(doctor);
  for (const [key, value] of keyValue) {
    if (key === "id") {
      continue;
    }

    fieldsToUpdate.push(`${key} = ?`);
    data.push(value);
  }

  data.push(doctor.id);
  const query = `UPDATE doctor_detail SET ${fieldsToUpdate.join(
    ", "
  )} WHERE id = ?`;

  await connection.execute(query, data);
};

const getDoctors = async () => {
  const [results] = await connection.execute(
    "SELECT * FROM doctor_detail ORDER BY created_at DESC"
  );
  return results;
};

const getDoctor = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM doctor_detail WHERE id = ?",
    [id]
  );

  const doc = result.pop();
  delete doc.created_at;
  delete doc.updated_at;
  return doc;
};

const delDoctor = async (id) => {
  await connection.execute("DELETE FROM doctor_detail WHERE id = ?", [id]);
};

const updatePassword = async (pwd, id) => {
  await connection.execute("UPDATE admin_user SET password = ? WHERE id = ?", [
    pwd,
    id,
  ]);
};

const addHospital = async (hospitalDetails, imagePath) => {
  await connection.execute(
    `INSERT INTO hospitals (name, contact_num, details, city, state, img) 
    VALUES (?,?,?,?,?,?)`,
    [
      hospitalDetails.hospName,
      hospitalDetails.contactNum,
      hospitalDetails.hospDetails,
      hospitalDetails.hospCity,
      hospitalDetails.hospState,
      imagePath,
    ]
  );
};

const updateHospital = async (hospital) => {
  const fieldsToUpdate = [];
  const data = [];
  const keyValue = Object.entries(hospital);
  for (const [key, value] of keyValue) {
    if (key === "id") {
      continue;
    }

    fieldsToUpdate.push(`${key} = ?`);
    data.push(value);
  }

  data.push(hospital.id);
  const query = `UPDATE hospitals SET ${fieldsToUpdate.join(
    ", "
  )} WHERE id = ?`;

  await connection.execute(query, data);
};

const getHospitals = async () => {
  const [results] = await connection.execute(
    "SELECT * FROM hospitals ORDER BY created_at DESC"
  );
  return results;
};

const getHospital = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM hospitals WHERE id = ?",
    [id]
  );
  const hosp = result.pop();
  delete hosp.created_at;
  delete hosp.updated_at;
  return hosp;
};

const delHospital = async (id) => {
  await connection.execute("DELETE FROM hospitals WHERE id = ?", [id]);
};

const getHospitalCount = async () => {
  const [count] = await connection.execute(
    "SELECT count(*) AS totalCount FROM hospitals"
  );
  return count.pop().totalCount;
};

const getTestimonials = async () => {
  const [results] = await connection.execute(
    "SELECT * FROM testimonial ORDER BY created_at DESC"
  );
  return results;
};

const getTestimonial = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM testimonial WHERE id = ?",
    [id]
  );
  return result.pop();
};

const addTestimonial = async (testimonial, imagePath) => {
  await connection.execute(
    `INSERT INTO testimonial (client_name, treatment, doc_name, hospital_name, testimony, city, state, client_country, img) 
    VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      testimonial.clientName,
      testimonial.treatment,
      testimonial.docName,
      testimonial.hospitalName,
      testimonial.testimony,
      testimonial.city,
      testimonial.state,
      testimonial.clientCountry,
      imagePath,
    ]
  );
};

const delTestimonial = async (id) => {
  await connection.execute("DELETE FROM testimonial WHERE id = ?", [id]);
};

const getTestimonialCount = async () => {
  const [count] = await connection.execute(
    "SELECT count(*) AS totalCount FROM testimonial"
  );
  return count.pop().totalCount;
};

const getInquiries = async () => {
  const [results] = await connection.execute(
    "SELECT * FROM inquiry ORDER BY created_at DESC"
  );
  return results;
};

const getInquiry = async (id) => {
  const [result] = await connection.execute(
    "SELECT * FROM inquiry WHERE id = ?",
    [id]
  );
  const inquiry = result.pop();
  delete inquiry.created_at;
  delete inquiry.updated_at;
  return inquiry;
};

const getBusinessDetails = async () => {
  const [results] = await connection.execute(
    "SELECT * FROM business_details LIMIT 1"
  );
  return results.length > 0 ? results.pop() : undefined;
};

const updateBusinessDetail = async (keyValue) => {
  const fieldsToUpdate = [];
  const data = [];
  for (const [key, value] of keyValue) {
    fieldsToUpdate.push(`${key} = ?`);
    data.push(value);
  }

  const query = `UPDATE business_details SET ${fieldsToUpdate.join(", ")}`;
  await connection.execute(query, data);
};

module.exports = {
  getUserByEmail,
  getUserById,
  blockUser,
  updateFailureAttempt,
  resetFailureAttempt,
  addDoctor,
  updateDoctor,
  getDoctors,
  getDoctor,
  delDoctor,
  getDoctorsCount,
  getInquiriesCount,
  updatePassword,
  addHospital,
  updateHospital,
  getHospitals,
  getHospitalCount,
  getHospital,
  delHospital,
  getTestimonials,
  getTestimonial,
  addTestimonial,
  delTestimonial,
  getTestimonialCount,
  getInquiries,
  getInquiry,
  getBusinessDetails,
  updateBusinessDetail,
};
