const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Import the model
const { jwtAuthMiddleware, hashPassword } = require("../jwt");
// console.log("Hi Mrinal");

router.post("/register", hashPassword, async (req, res) => {
  const { email, userName, isAdmin, name, password, image, coin, streak } =
    req.body;

  // Create a new user instance
  const newUser = new User({
    email,
    password,
    name,
    isAdmin,
    image,
    coin,
    streak,
  });

  try {
    // Save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding user to the database" });
  }
});

router.post("/userLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credential" });
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/dashboard", jwtAuthMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
