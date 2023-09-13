const auth = require("../middlewares/authorization");
const isAdmin = require("../middlewares/adminCheck");
const isMainAdmin = require("../middlewares/mainAdminCheck");
const upload = require("../middlewares/fileSend");
const { create, getById, getAll, login } = require("../controllers/studentController");

const router = require("express").Router();

router.post("/student", auth, isAdmin, isMainAdmin, upload, create);
router.put("/student/:_id", auth, isAdmin, isMainAdmin, upload);
router.get("/student", auth, isAdmin, isMainAdmin, getAll);
router.get("/student/:_id", auth, isAdmin, isMainAdmin, getById);
router.post("/student/login", login);



module.exports = router;