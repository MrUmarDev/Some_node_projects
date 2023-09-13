const auth = require("../middlewares/authorization");
const isAdmin = require("../middlewares/adminCheck");
const isMainAdmin = require("../middlewares/mainAdminCheck");
const { create, update, getById, getAll } = require("../controllers/groupController");

const router = require("express").Router();

router.post("/group", auth, isAdmin, isMainAdmin, create);
router.put("/group/:_id", auth, isAdmin, isMainAdmin, update);
router.get("/group", auth, isAdmin, isMainAdmin, getAll);
router.get("/group/:_id", auth, isAdmin, isMainAdmin, getById);



module.exports = router;