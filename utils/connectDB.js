const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const localhost = "mongodb://127.0.0.1:27017/threads-app";
const mongoUri = process.env.MONGODB_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    mongoUri
      ? console.log("DB Connected")
      : console.log("DB Localhost Connected");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

module.exports = connectDB;
