const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs");
})
router.get("/register", (req,res) => {
    res.render("register.ejs")
})
router.get("/login", (req,res) => {
    res.render("index.ejs")
})
module.exports = router;