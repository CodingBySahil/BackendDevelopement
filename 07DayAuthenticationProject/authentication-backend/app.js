const express = require("express");
const { connectDB } = require("./configs/dbConnection");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const cors = require("cors");

app.use(cors());
connectDB();

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
