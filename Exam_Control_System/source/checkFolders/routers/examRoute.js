const auth = require("../middlewares/authorization");
const isAdmin = require("../middlewares/adminCheck");
const upload = require("../middlewares/fileSend");
const { create, getById, getAll } = require("../controllers/examController");

const router = require("express").Router();

router.post("/exam", auth, isAdmin, upload, create);
router.put("/exam/:_id", auth, isAdmin, upload);
router.get("/exam/all/:_id", auth, isAdmin, getAll);
router.get("/exam/:_id", getById);


module.exports = router;