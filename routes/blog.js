const express = require("express");
const router = express.Router();
const blog = require("../controllers/blog");
const dotenv = require("dotenv").config();

router.get("/", blog.posts);
router.get("/search", (req,res) => {
    res.render('./blog/search', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/post/:postId", blog.checkpost);

router.post("/search", blog.find);

module.exports = router;