const {Router} = require("express");
const { createImtixon, createBall, viwFiles } = require("../contrllers/teacher.controller");
const isAuth = require("../middlewares/is-auth.middleware");
const isTeacher = require("../middlewares/is-teacher.middleware");

const router = Router();

router.post("/teacher/create",isAuth,isTeacher,createImtixon);
router.post("/teacher/Ball",isAuth,isTeacher,createBall);
router.post("/teacher/files",isAuth,isTeacher,viwFiles);

module.exports = router;