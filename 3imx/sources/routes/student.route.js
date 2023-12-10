const {Router} = require("express");
const { filestudent, findAllexam } = require("../contrllers/student.controller");
const isAuth = require("../middlewares/is-auth.middleware");

const router = Router();

router.post("/student/createfile",isAuth,filestudent);
router.get("/student/find",isAuth,findAllexam);

module.exports = router;