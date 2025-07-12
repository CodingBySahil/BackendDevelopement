const express = require("express");
const {
  RegisterNewUser,
  LoginAUser,
} = require("../controllers/authControllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>hello sahil</h1>");
});

router.post("/register", RegisterNewUser);
router.post("/login", LoginAUser);
module.exports = router;
