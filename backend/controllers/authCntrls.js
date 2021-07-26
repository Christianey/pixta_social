require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);
const jwt = require("jsonwebtoken");
const {
  generatePasswordHash,
  validatePassword,
} = require("../lib/passwordUtils");
const { createAccessToken, createRefreshToken } = require("../lib/jwtUtils");
const User = require("../models/user");

const authCntrls = {
  register: async function (req, res, next) {
    try {
      const { fullName, username, email, password, gender } = req.body;

      if (username.trim().includes(" ")) {
        return res
          .status(400)
          .json({ message: "username must not contain spaces" });
      }

      const newUsername = await User.findOne({ username });

      if (newUsername)
        return res.status(400).json({ message: "User already exists" });

      const newEmail = await User.findOne({ email });

      if (newEmail)
        return res.status(400).json({ message: "Email already in use" });

      if (password < 6)
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });

      const { salt, hash } = generatePasswordHash(password);

      const userData = {
        fullName,
        username,
        email,
        salt,
        hash,
        gender,
      };
      const user = new User(userData);

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await user.save();

      res.json({
        message: "Registration Successful!",
        accessToken,
        user: { ...user._doc, salt: null, hash: null },
      });
    } catch (error) {
      debug(error);
      res.status(500).json({ error });
    }
  },
  login: async function () {},
  login: async function () {},
  logout: async function () {},
  generateAccessToken: async function () {},
};

module.exports = authCntrls;
