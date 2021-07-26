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

      if (!fullName || !username || !email || !password)
        return res
          .status(400)
          .json({ message: "Please input all required fields." });

      if (username.trim().includes(" ")) {
        return res
          .status(400)
          .json({ message: "username must not contain spaces" });
      }

      const newUsername = await User.findOne({ username });

      if (newUsername)
        return res.status(400).json({ message: "Username already in use" });

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

      res.cookie("refreshToken", refreshToken, {
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
      next(error);
    }
  },
  login: async function (req, res, next) {
    try {
      const { email, username, password } = req.body;

      if (!(email || username))
        return res
          .status(400)
          .json({ message: "Please input username or email and try again" });

      const user = await Promise.any([
        User.findOne({ email })
          .select("-salt -hash")
          .populate("followers following", "-salt -hash"),
        User.findOne({ username }).populate(
          "followers following",
          "-salt -hash"
        ),
      ]);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Username or email doesn't exist" });
      }

      if (!validatePassword(password, user.salt, user.hash)) {
        return res.status(400).json({ message: "Invalid password." });
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        message: "Login successful",
        accessToken,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
  logout: async function (req, res, next) {
    try {
      res.clearCookie("refreshToken", {
        path: "/api/refresh_token",
      });

      res.json({ message: "Logged out" });
    } catch (error) {
      next(error);
    }
  },
  generateAccessToken: async function (req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(400).json({ message: "Please login." });

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SCRET,
        async (error, userId) => {
          if (error) return res.status(400).json({ message: "Please login" });

          const user = await User.findById(userId)
            .select("-hash -salt")
            .populate("followers following", "-hash -salt");

          if (!user)
            return res.status(400).json({ message: "User doesn't exist" });

          const accessToken = createAccessToken({ id: user._id });

          res.json({
            accessToken,
            user,
          });
        }
      );
      res.json({ refreshToken });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authCntrls;
