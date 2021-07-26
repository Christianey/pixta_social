const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 25,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    salt: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "", //cloudinary link to default avatar picture
    },
    role: { type: String, default: "user" },
    gender: { type: String, default: "male" },
    address: { type: String, default: "" },
    website: { type: String, default: "" },
    story: {
      type: String,
      default: "",
      maxLength: 200,
    },
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
