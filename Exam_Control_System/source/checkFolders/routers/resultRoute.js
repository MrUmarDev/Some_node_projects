const auth = require("../middlewares/authorization");
const isAdmin = require("../middlewares/adminCheck");
const isStudent = require("../middlewares/userCheck");
const isMainAdmin = require("../middlewares/mainAdminCheck");
const upload = require("../middlewares/fileSend");
const { create, update, getById, getAll, getIds } = require("../controllers/resultController");

const router = require("express").Router();

router.post("/result", auth, isStudent, upload, create);
router.get("/result/student", auth, isStudent, getIds);
router.put("/result/:_id", auth, isAdmin, update);
router.get("/result/all/:_id", auth, isAdmin, isMainAdmin, getAll);
router.get("/result/:_id", auth, isAdmin, isMainAdmin, getById);




module.exports = router;