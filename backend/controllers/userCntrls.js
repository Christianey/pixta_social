const User = require("../models/user");

const userCntrls = {
  searchUser: async (req, res) => {
    const { user } = req;

    if (!user)
      return res.status(403).json({ message: "Invalid Authentication" });
    const { username } = req.query;

    const users = await User.find({ username: { $regex: username } })
      .select("avatar username fullName")
      .limit(10);
    res.json({ users });
  },
  getUser: async (req, res) => {
    const { user } = req;

    if (!user)
      return res.status(403).json({ message: "Invalid Authentication" });
    const { id } = req.params;

    const newProfile = await User.findById(id).select("-salt -hash");
    if (!newProfile)
      return res.status(400).json({ message: "User doesn't exist." });

    res.json({ user: newProfile });
  },
};

module.exports = userCntrls;
