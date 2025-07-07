const { connectDB, app } = require("./config/DBConnection");
const express = require("express");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/api/contact", require("./routes/contact"));
require("dotenv").config();
connectDB();
