const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const todoRoutes = require("./routes/todos");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
