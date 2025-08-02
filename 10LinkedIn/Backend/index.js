import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

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
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
// ✅ Must allow credentials and your frontend origin

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
