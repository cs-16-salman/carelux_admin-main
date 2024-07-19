const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const { checkSchema, validationResult } = require("express-validator");

const imageStorage = require("../config/image_storage_config");

const adminService = require("../service/adminService");
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

router.get("/doctor/:id", async (req, res) => {
  const docId = req.params["id"];
  const result = await adminService.getDoctor(docId);
  delete result.created_at;
  delete result.updated_at;
  res.send(result);
});

router.get("/hospital/:id", async (req, res) => {
  const hospId = req.params["id"];
  const result = await adminService.getHospital(hospId);
  delete result.created_at;
  delete result.updated_at;
  res.send(result);
});

router.get("/inquiry/:id", async (req, res) => {
  const inqId = req.params["id"];
  const result = await adminService.getInquiry(inqId);
  delete result.created_at;
  delete result.updated_at;
  res.send(result);
});

module.exports = router;
