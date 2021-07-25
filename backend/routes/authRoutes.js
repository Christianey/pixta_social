const router = require("express").Router();
const authCntrls = require("../controllers/authCntrls");

router.post("/register", authCntrls.register);

router.post("/login", authCntrls.login);

router.post("/logout", authCntrls.logout);

router.post("/refresh_token", authCntrls.generateAccessToken);

module.exports.authRoutes = router;
