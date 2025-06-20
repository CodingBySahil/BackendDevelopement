import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./dbConnection.js"; // Must include .js extension

dotenv.config();
const app = express();
app.use(express.json());

let db;
connectToDB().then((database) => {
  db = database;

  app.get("/read_data", async (req, res) => {
    const data = await db.collection("students").find().toArray();
    res.json(data);
  });

  app.get("/insert_data", async (req, res) => {
    const { SName, SPhone } = req.body;
    // res.send({ SName, SPhone });
    const result = await db.collection("students").insertOne({ SName, SPhone });
    res.send("Inserted: " + JSON.stringify(result.insertedId));
  });

  app.get("/", (req, res) => {
    res.send("Welcome to the API!");
  });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
