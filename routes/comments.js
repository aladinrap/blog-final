const express = require("express");
const router = express.Router();
const loggedIn = require("../middleware/loggedin");
const comments = require("../controllers/comments");

router.get("/", loggedIn, comments.index);
router.get("/edit/:commentsId", loggedIn, comments.edit);
router.get("/delete/:commentsId", loggedIn, comments.remove);

router.post("/blog", comments.add);
router.post("/update/:commentId", comments.edit);
router.post("/delete/:commentId", comments.Delete);


module.exports = router;