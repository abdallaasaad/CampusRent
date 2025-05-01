const mongoose = require("mongoose");
const nameSchema = new mongoose.Schema({ first:String, middle:String, last:String }, { _id:false });
const imageSchema = new mongoose.Schema({ url:String, alt:String }, { _id:false });
const addressSchema = new mongoose.Schema({ state:String, country:String, city:String, street:String, houseNumber:Number, zip:Number }, { _id:false });
const userSchema = new mongoose.Schema({
  name: nameSchema,
  isBusiness: Boolean,
  phone: String,
  email: { type:String, unique:true },
  password: String,
  address: addressSchema,
  image: imageSchema,
  isAdmin: Boolean
}, { timestamps:true });
module.exports = mongoose.model("User", userSchema);
