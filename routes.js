const express = require("express");
const blogComments = require("./controllers/blogComments")
const blogPosts = require("./controllers/blogPosts");
const dotenv = require("dotenv").config();
const router = express.Router();
const auth = require("./controllers/auth");

router.get("/", (req, res) => {
    res.render('index', { title: 'Homepage URZISOFT', layout: './layouts/home' })
})
router.get("/register", (req,res) => {
    res.render('register', { title: 'REGISTER URZISOFT', layout: './layouts/home' })
})

router.get("/login", (req,res) => {
    res.render('login', { title: 'Login URZISOFT', layout: './layouts/home' })
})
router.get("/blog", blogPosts);

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/register", auth.register);
router.post("/blog", auth.blogComments)


module.exports = router;