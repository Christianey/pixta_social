const router = require("express").Router();
const auth = require("../middleware/auth");
const userCntrls = require("../controllers/userCntrls");

router.get("/search", auth, userCntrls.searchUser);
router.get("/user/:id", auth, userCntrls.getUser);

module.exports.userRoutes = router;
