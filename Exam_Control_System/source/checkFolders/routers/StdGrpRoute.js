
const auth = require("../middlewares/authorization");
const isAdmin = require("../middlewares/adminCheck");
const isStudent = require("../middlewares/userCheck");
const isMainAdmin = require("../middlewares/mainAdminCheck");
const { create, getAll, getAlls } = require("../controllers/grpstdController");

const router = require("express").Router();

router.post("/groups/student", auth, isAdmin, isMainAdmin, create);
router.get("/groups/student", auth, isAdmin, isMainAdmin, getAll);
router.get("/groups/student/:_id", auth, isStudent, getAlls);




module.exports = router;