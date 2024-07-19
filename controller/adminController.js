const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const { checkSchema, validationResult } = require("express-validator");

const imageStorage = require("../config/image_storage_config");

const adminService = require("../service/adminService");
const passport = require("../config/passport-config");
const chngPwdSchema = require("../validation/chngPwd_schema");
const addDoctorSchema = require("../validation/addDoctor_schema");
const addHospitalSchema = require("../validation/addHospital_schema");
const addTestimonialSchema = require("../validation/addTestimonial_schema");

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(methodOverride("_method"));

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("login");
};

const checkNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect("dashboard");
};

// Get admin login page
router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("admin-login");
});

// Do admin login
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "dashboard",
    failureRedirect: "login",
    failureFlash: true,
  })
);

// Do admin logout
router.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("login");
  });
});

router.post(
  "/change-password",
  checkAuthenticated,
  urlencodedParser,
  checkSchema(chngPwdSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
    } else {
      await adminService.updatePassword(req);
    }

    res.redirect("dashboard");
  }
);

// Admin dashboard
router.get("/dashboard", checkAuthenticated, async (req, res) => {
  const statistics = await adminService.getStatistics();
  res.locals.statistics = statistics;
  res.render("admin-dashboard");
});

router.get("/doctors", checkAuthenticated, async (req, res) => {
  const doctors = await adminService.getDoctorDetails();
  res.locals.doctors = doctors;
  res.render("admin-doctors");
});

router.post(
  "/add_doctor",
  checkAuthenticated,
  urlencodedParser,
  imageStorage.single("docAvatar"),
  checkSchema(addDoctorSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
    } else {
      await adminService.addDoctor(req);
    }

    res.redirect("doctors");
  }
);

router.post(
  "/delete_doctor",
  checkAuthenticated,
  urlencodedParser,
  async (req, res) => {
    await adminService.delDoctor(req);
    res.redirect("doctors");
  }
);

router.post(
  "/update_doctor",
  checkAuthenticated,
  urlencodedParser,
  imageStorage.single("updateDocAvatar"),
  checkSchema(addDoctorSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
    } else {
      await adminService.updateDoctor(req);
    }

    res.redirect("doctors");
  }
);

router.post(
  "/add_hospital",
  checkAuthenticated,
  urlencodedParser,
  imageStorage.single("hospImg"),
  checkSchema(addHospitalSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
    } else {
      await adminService.addHospital(req);
    }

    res.redirect("hospitals");
  }
);

router.get("/hospitals", checkAuthenticated, async (req, res) => {
  const hospitals = await adminService.getHospitals(req);
  res.locals.hospitals = hospitals;
  res.render("admin-hospitals");
});

router.post(
  "/delete_hospital",
  checkAuthenticated,
  urlencodedParser,
  async (req, res) => {
    await adminService.delHospital(req);
    res.redirect("hospitals");
  }
);

router.post(
  "/update_hospital",
  checkAuthenticated,
  urlencodedParser,
  imageStorage.single("updateHospImg"),
  checkSchema(addHospitalSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
    } else {
      await adminService.updateHospital(req);
    }
    res.redirect("hospitals");
  }
);

router.get("/testimonials", checkAuthenticated, async (req, res) => {
  const testimonials = await adminService.getTestimonials(req);
  res.locals.testimonials = testimonials;
  res.render("admin-testimonials");
});

router.post(
  "/add_testimonial",
  checkAuthenticated,
  urlencodedParser,
  imageStorage.single("clientImg"),
  checkSchema(addTestimonialSchema),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("error", errors.array()[0].msg);
    } else {
      await adminService.addTestimonial(req);
    }

    res.redirect("testimonials");
  }
);

router.post(
  "/delete_testimonial",
  checkAuthenticated,
  urlencodedParser,
  async (req, res) => {
    await adminService.delTestimonial(req);
    res.redirect("testimonials");
  }
);

router.get("/inquiries", checkAuthenticated, async (req, res) => {
  const inquiries = await adminService.getInquiries(req);
  res.render("admin-inquiries", { inquiries });
});

router.get("/business_info", checkAuthenticated, async (req, res) => {
  const businessDetails = await adminService.getBusinessDetails(req);
  res.render("business_details", { businessDetails });
});

router.post(
  "/update_business_detail",
  checkAuthenticated,
  urlencodedParser,
  async (req, res) => {
    await adminService.updateBusinessDetail(req);
    res.redirect("business_info");
  }
);

module.exports = router;
