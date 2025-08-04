const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema(
  { first: String, middle: String, last: String },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  { url: String, alt: String },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    state: String,
    country: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: nameSchema,
    isBusiness: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }, 
    phone: String,
    email: { type: String, unique: true },
    password: String,
    address: addressSchema,
    image: imageSchema,

    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Card",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
