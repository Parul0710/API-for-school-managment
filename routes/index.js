var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
const controllerSchema = require("../app/auth/controller/controll.school");

router.post("/addSchool", controllerSchema.addSchool);
router.get("/listSchool", controllerSchema.listSchools);

module.exports = router;
