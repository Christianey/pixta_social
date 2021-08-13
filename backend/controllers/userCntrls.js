const User = require("../models/user");

const userCntrls = {
  searchUser: async (req, res) => {
    const { user } = req;
    console.log(user);
    if (!user)
      return res.status(403).json({ message: "Invalid Authentication" });
    const { username } = req.query;

    const users = await User.find({ username: { $regex: username } })
      .select("avatar username fullName")
      .limit(10);
    res.json({ users });
  },
};

module.exports = userCntrls;
