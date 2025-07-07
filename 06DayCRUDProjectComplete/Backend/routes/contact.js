const express = require("express");
const contactSchema = require("../models/contactSchema");
const {
  uploadContact,
  getAllContacts,
  getSingleContact,
  getContactByName,
  updateContact,
  deleteContact,
} = require("../controllers/route_controllers");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

// upload/post a single contact
router.post("/upload", uploadContact);

// get all contacts
router.get("/get_all_contacts", getAllContacts);

// get a single contact by ID
router.get("/get_single_contact/:id", getSingleContact);

// get contacts by name
router.get("/get_contacts_by_name/:name", getContactByName);

// update a contact by ID
router.put("/update_contact/:id", updateContact);

// delete a contact by ID
router.delete("/delete_contact/:id", deleteContact);

module.exports = router;
