const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
const loggedIn = require("../middleware/loggedin");
const admin = require("../controllers/admin");

router.get("/logout", auth.logout);
router.get("/", loggedIn, admin.panel);
router.get("/login", (req,res) => {
    res.render('./admin/users/login', { title: 'URZISOFT', layout: './layouts/home' })
})

router.post("/login", auth.login);

module.exports = router;