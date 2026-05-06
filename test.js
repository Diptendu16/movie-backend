import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("Connecting to:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed:", err.message);
    process.exit(1);
  });