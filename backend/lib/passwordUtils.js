const crypto = require("crypto");

const generatePasswordHash = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

const validatePassword = (password, salt, hash) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hashVerify === hash;
};

module.exports = { generatePasswordHash, validatePassword };
