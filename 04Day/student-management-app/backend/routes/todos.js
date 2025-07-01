const express = require("express");
const router = express.Router();
const dbConnection = require("../db/dbConnection");
const { ObjectId } = require("mongodb");

let collection;
(async () => {
  const db = await dbConnection();
  collection = db.collection("CRUDOperationCollection");
})();

// GET
router.get("/", async (req, res) => {
  try {
    const result = await collection.find().toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const { SName, SClass, RollNo, Section, PhoneNumber, Address } = req.body;
  if (!SName || !SClass) {
    return res.status(400).json({ error: "SName and SClass are required" });
  }
  try {
    const result = await collection.insertOne({
      SName,
      SClass,
      RollNo,
      Section,
      PhoneNumber,
      Address,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  const updateFields = req.body;
  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateFields }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
