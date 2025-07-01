const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URL);
let db;

const dbConnection = async () => {
  if (!db) {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    db = client.db(process.env.DB_NAME);
  }
  return db;
};

module.exports = dbConnection;
