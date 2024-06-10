const router = require("express").Router();

const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, username, password, photo } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      photo,
    });
    res.json({
      message: "User Created",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
