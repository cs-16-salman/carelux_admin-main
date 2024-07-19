const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let filePath = "./public/images/";
    switch (req.url) {
      case "/add_doctor":
      case "/update_doctor":
        filePath += "doctors";
        break;
      case "/add_hospital":
      case "/update_hospital":
        filePath += "hospitals";
        break;
      case "/add_testimonial":
        filePath += "testimonials";
        break;
    }
    cb(null, filePath);
  },

  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    let fileName = `${Date.now()}.${fileExt}`;
    switch (req.url) {
      case "/add_doctor":
      case "/update_doctor":
        fileName = "doc_avatar_" + fileName;
        break;
      case "/add_hospital":
      case "/update_hospital":
        fileName = "hosp_img_" + fileName;
        break;
      case "/add_testimonial":
        fileName = "testimonial_img_" + fileName;
        break;
    }
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    return cb(null, true);
  }

  return cb(null, false);
};

const imageStorage = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = imageStorage;
