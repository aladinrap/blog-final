const express = require("express");
const dotenv = require("dotenv").config();
const router = express.Router();

router.get("/", (req, res) => {
    res.render('index', { title: 'URZISOFT', layout: './layouts/home' })
})


module.exports = router;