const router = require("express").Router();
const auth = require("../middleware/auth");
const userCntrls = require("../controllers/userCntrls");

router.get("/search", auth, userCntrls.searchUser);

module.exports.userRoutes = router;
