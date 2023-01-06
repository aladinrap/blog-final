const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();
const index = require("../controllers/index");

router.get("/", index.index);

module.exports = router;