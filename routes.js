const express = require("express");
const loggedIn = require("./controllers/loggedin");
const blog = require("./controllers/blog");
const admin = require("./controllers/admin");
const dotenv = require("dotenv").config();
const router = express.Router();
const auth = require("./controllers/auth");
const category = require("./controllers/category");
const users = require("./controllers/users");
const posts = require("./controllers/posts");
const comments = require("./controllers/comments");
const password = require("./controllers/password");

router.get("/", (req, res) => {
    res.render('index', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/admin/login", (req,res) => {
    res.render('./admin/users/login', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/blog/search", (req,res) => {
    res.render('./blog/search', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/admin/password/reset", (req,res) => {
    res.render('./admin/password/request.ejs', { title: 'URZISOFT', layout: './layouts/home' })
})

router.get("/admin/password/reset/:hashId", password.reset);

router.get("/admin", loggedIn, admin.panel);

router.get("/admin/categories", loggedIn, category.index);
router.get("/admin/categories/delete/:categoryId", loggedIn, category.remove);
router.get("/admin/categories/create", loggedIn, category.create);
router.get("/admin/categories/edit/:categoryId", loggedIn, category.edit);

router.post("/admin/categories/edit/:categoryId", category.update);
router.post("/admin/category/create", category.add);
router.post("/admin/categories/delete/:categoryId", category.Delete);


router.get("/admin/users", loggedIn, users.index);
router.get("/admin/users/create", loggedIn, users.create);
router.get("/admin/users/edit/:usersId", loggedIn, users.edit);
router.get("/admin/users/delete/:usersId", loggedIn, users.remove);

router.post("/users/store", users.register);
router.post("/admin/users/edit/:userId", users.update);
router.post("/admin/users/delete/:userId", users.Delete);

router.get("/admin/posts/create", loggedIn, posts.create);
router.get("/admin/posts", loggedIn, posts.index);
router.get("/admin/posts/delete/:postId", loggedIn, posts.remove);
router.get("/admin/posts/edit/:postId", loggedIn, posts.edit);

router.post("/admin/posts/create", posts.create);
router.post("/admin/posts/delete/:postId", posts.Delete);
router.post("/admin/posts/edit/:postId", posts.update);

router.get("/admin/posts/:postId/comments", loggedIn, comments.index);
router.get("/admin/posts/:postId/comments/edit/:commentsId", loggedIn, comments.edit);
router.get("/admin/posts/:postId/comments/delete/:commentsId", loggedIn, comments.remove);

router.post("/blog", comments.add);
router.post("/admin/posts/edit/:postId/comments/edit/:commentId", comments.edit);
router.post("/admin/posts/edit/:postId/comments/delete/:commentId", comments.Delete);




router.get("/blog", blog.posts);
router.get("/blog/post/:postId", blog.checkpost);
router.post("/blog/search", blog.find);

router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.post("/admin/password/request", password.request);
router.post("/admin/password/update", password.update);






module.exports = router;