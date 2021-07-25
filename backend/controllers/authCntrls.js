require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
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

      const salt = crypto.randomBytes(32).toString("hex");
      const passwordHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      const userData = {
        fullName,
        username,
        email,
        password: passwordHash,
        gender,
      };
      const user = new User(userData);
      await user.save();

      res.json(user);
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
