const {Router} = require("express");
const { register, login } = require("../contrllers/auth.controller");
const isAuth = require("../middlewares/is-auth.middleware");
const isTeacher = require("../middlewares/is-teacher.middleware");

const router = Router();

router.post("/auth/register",isAuth,isTeacher,register);
router.post("/auth/login",login);

module.exports = router;