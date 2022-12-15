const express = require("express");
const router = express.Router();
const blog = require("../controllers/blog");

router.get("/search", (req,res) => {
    res.render('./blog/search', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/", blog.posts);
router.get("/post/:postId", blog.checkpost);

router.post("/search", blog.find);

module.exports = router;