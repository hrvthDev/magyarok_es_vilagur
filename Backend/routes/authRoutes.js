const express = require("express");
const router = express.Router();
const db = require("../db/database.js");
const {registerForm, loginForm} = require("../controller/authController.js");


router.post("/login", loginForm );
router.post("/register", registerForm);




module.exports = router;




