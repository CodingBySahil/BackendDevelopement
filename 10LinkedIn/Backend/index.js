import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8020;

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // frontend port (Vite default)
    credentials: true, // allow cookies to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use(cookieParser());
// ✅ Must allow credentials and your frontend origin

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
