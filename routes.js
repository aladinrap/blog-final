const express = require("express");
const router = express.Router();
const auth = require("./controllers/auth");

router.get("/", (req, res) => {
    res.render('index', { title: 'Homepage URZISOFT', layout: './layouts/home' })
})
router.get("/register", (req,res) => {
    res.render('register', { title: 'Login URZISOFT', layout: './layouts/home' })
})

router.get("/login", (req,res) => {
    res.render('login', { title: 'Login URZISOFT', layout: './layouts/home' })
})
router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.post("/register", auth.register);

module.exports = router;