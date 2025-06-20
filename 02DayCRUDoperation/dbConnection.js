// dbConnection.js
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config(); // ✅ Load env before anything else

const client = new MongoClient(process.env.db_URI);

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    return client.db("myDatabase_for_practice");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export { connectToDB };
