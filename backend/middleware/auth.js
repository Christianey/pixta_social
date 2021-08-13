require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(403).json({ message: "Invalid Authentication" });

  const { id: userId } = jwt.verify(
    authorization,
    process.env.ACCESS_TOKEN_SECRET
  );

  const user = await User.findById(userId).select("-hash -salt");
  if (!user) return res.status(403).json({ message: "Invalid Authentication" });

  req.user = user;
  next();
};

module.exports = auth;
