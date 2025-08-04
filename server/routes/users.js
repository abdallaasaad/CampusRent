
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const auth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");
const User = require("../models/User");
const Card = require("../models/Card");

const router = express.Router();

// LIST all users (admin only)
router.get("/", auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    res.status(500).send("Server error");
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
    res.status(500).send("Server error");
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
    res.status(500).send("Server error");
  }
});

// GET my profile
router.get("/me", auth, async (req, res) => {
  try {
    const u = await User.findById(req.user._id).select("-password");
    res.send(u);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// GET all favorite cards for student
router.get("/favorites", auth, async (req, res) => {
  try {
    if (req.user?.isBusiness === true || req.user?.isAdmin === true){

      return res.status(403).send("Only students can view favorites");
    }

    const user = await User.findById(req.user._id);
    const cards = await Card.find({ _id: { $in: user.favorites } });
    res.json(cards);
  } catch (err) {
    res.status(500).send("Server error");
  }
});
// GET one user by id (admin or self)
router.get("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isAdmin && req.user._id.toString() !== req.params.id){
      
      return res.status(403).send("Access denied");
    }

    const u = await User.findById(req.params.id).select("-password");
    if (!u) return res.status(404).send("Not found");
    res.send(u);
  } catch (err) {
    res.status(500).send("Server error");
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
    res.status(500).send("Server error");
  }
});

// DELETE a user (admin only)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ADD or REMOVE favorite
router.post("/favorites/:cardId", auth, async (req, res) => {
  try {
    if (req.user.isBusiness || req.user.isAdmin)
      return res.status(403).send("Only students can manage favorites");

    const user = await User.findById(req.user._id);
    const index = user.favorites.indexOf(req.params.cardId);

    if (index > -1) {
      user.favorites.splice(index, 1);
      await user.save();
      return res.send("Removed from favorites");
    }

    user.favorites.push(req.params.cardId);
    await user.save();
    res.send("Added to favorites");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.delete("/favorites/:cardId", auth, async (req, res) => {
  try {
    if (req.user.isBusiness || req.user.isAdmin)
      return res.status(403).send("Only students can remove favorites");

    const user = await User.findById(req.user._id);
    const index = user.favorites.indexOf(req.params.cardId);

    if (index === -1)
      return res.status(404).send("Card not found in favorites");

    user.favorites.splice(index, 1);
    await user.save();

    res.send("Removed from favorites");
  } catch (err) {
    console.error("DELETE /favorites error:", err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
