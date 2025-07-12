const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log("DB connected succesfully");
  return connection;
};
module.exports = { connectDB };
