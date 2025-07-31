import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8020;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
