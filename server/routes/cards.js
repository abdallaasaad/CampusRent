// server/routes/cards.js

const express = require("express");
const auth = require("../middlewares/auth");
const Card = require("../models/Card");
const router = express.Router();

// List all cards (apartments), newest first, including owner’s phone/name/email
router.get("/", auth, async (req, res) => {
  try {
    const cards = await Card
      .find()
      .sort({ createdAt: -1 })
      .populate("ownerId", "phone name email");    // ← populate owner info
    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// List cards belonging to current user
router.get("/my-cards", auth, async (req, res) => {
  try {
    const cards = await Card
      .find({ ownerId: req.user._id })
      .populate("ownerId", "phone name email");
    res.status(200).json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Create a new card
router.post("/", auth, async (req, res) => {
  try {
    const c = new Card({ ...req.body, ownerId: req.user._id });
    await c.save();
    // populate before sending back
    await c.populate("ownerId", "phone name email");
    res.status(201).json(c);
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid data");
  }
});

// Get one card by id, including owner info
router.get("/:id", auth, async (req, res) => {
  try {
    const c = await Card
      .findById(req.params.id)
      .populate("ownerId", "phone name email");
    if (!c) return res.status(404).send("Not found");
    res.status(200).json(c);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update a card
router.put("/:id", auth, async (req, res) => {
  try {
    const c = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("ownerId", "phone name email");
    if (!c) return res.status(404).send("Not found");
    res.status(200).json(c);
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid data");
  }
});

// Delete a card (owner or admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const c = await Card.findById(req.params.id);
    if (!c) return res.status(404).send("Not found");
    if (req.user.isAdmin || c.ownerId.toString() === req.user._id) {
      await c.remove();
      return res.status(200).send("Deleted");
    } else {
      return res.status(403).send("Access denied");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
