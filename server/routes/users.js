// server/routes/users.js
const express   = require("express");
const bcrypt    = require("bcrypt");
const jwt       = require("jsonwebtoken");
const config    = require("../config/config");
const auth      = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");
const User      = require("../models/User");

const router = express.Router();

// LIST all users (admin only)
router.get("/", auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// REGISTER
router.post("/", async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) return res.status(400).send("Email already in use");

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hash });
    await user.save();

    res.status(201).send({ id: user._id });
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      { _id: user._id, isBusiness: user.isBusiness, isAdmin: user.isAdmin },
      config.jwtKey
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// GET my profile
router.get("/me", auth, async (req, res) => {
  try {
    const u = await User.findById(req.user._id).select("-password");
    res.send(u);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// GET one user by id (admin or self)
router.get("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id.toString() !== req.params.id)
      return res.status(403).send("Access denied");

    const u = await User.findById(req.params.id).select("-password");
    if (!u) return res.status(404).send("Not found");

    res.send(u);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// UPDATE one user by id (admin or self)
router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id.toString() !== req.params.id)
      return res.status(403).send("Access denied");

    const updates = { ...req.body };
    delete updates.password;

    const u = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).select("-password");

    if (!u) return res.status(404).send("Not found");

    res.send(u);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// DELETE a user (admin only)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

module.exports = router;
