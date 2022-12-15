const express = require("express");
const router = express.Router();

const loggedIn = require("../middleware/loggedin");
const users = require("../controllers/users");

router.get("/", loggedIn, users.index);
router.get("/create", loggedIn, users.create);
router.get("/edit/:usersId", loggedIn, users.edit);
router.get("/delete/:usersId", loggedIn, users.remove);

router.post("/store", users.register);
router.post("/edit/:userId", users.update);
router.post("/delete/:userId", users.Delete);


module.exports = router;