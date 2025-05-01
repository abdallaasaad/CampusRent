const mongoose = require("mongoose");
async function dataBaseConnection() {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser:true, useUnifiedTopology:true });
    console.log("Connected to DATABASE!");
  } catch (error) {
    console.error("Failed to Connect To DATABASE!", error);
    process.exit(1);
  }
}
module.exports = dataBaseConnection;
