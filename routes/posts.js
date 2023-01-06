const express = require("express");
const router = express.Router();
const loggedIn = require("../middleware/loggedin");
const posts = require("../controllers/posts");

router.get("/", loggedIn, posts.index);
router.get("/create", loggedIn, posts.create);
router.get("/delete/:postId", loggedIn, posts.remove);
router.get("/edit/:postId", loggedIn, posts.edit);

router.post("/create", posts.add);
router.post("/delete/:postId", posts.Delete);
router.post("/edit/:postId", posts.update);

module.exports = router;