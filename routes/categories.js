const express = require("express");
const router = express.Router();
const loggedIn = require("../middleware/loggedin");
const category = require("../controllers/category");

router.get("/", loggedIn, category.index);
router.get("/delete/:categoryId", loggedIn, category.remove);
router.get("/create", loggedIn, category.create);
router.get("/edit/:categoryId", loggedIn, category.edit);

router.post("/update/:categoryId", category.update);
router.post("/add", category.add);
router.post("/delete/:categoryId", category.Delete);

module.exports = router;