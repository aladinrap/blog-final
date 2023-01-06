const express = require("express");
const router = express.Router();
const password = require("../controllers/password");

router.get("/reset", (req,res) => {
    res.render('./admin/password/request', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/reset/:hashId", password.reset);

router.post("/request", password.request);
router.post("/update", password.update);

module.exports = router;