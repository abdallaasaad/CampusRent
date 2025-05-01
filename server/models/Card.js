const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({ url:String, alt:String }, { _id:false });
const cardSchema = new mongoose.Schema({
  title:String, description:String, price:Number, location:String, image:imageSchema,
  ownerId:{ type:mongoose.Schema.Types.ObjectId, ref:"User" }
}, { timestamps:true });
module.exports = mongoose.model("Card", cardSchema);
