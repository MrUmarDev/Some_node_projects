const { login } = require("../controllers/adminController");
const router = require("express").Router();


router.post("/admin/login", login);


module.exports = router;