const express = require("express");
const loggedIn = require("./controllers/loggedin");
const blog = require("./controllers/blog");
const admin = require("./controllers/admin");
const dotenv = require("dotenv").config();
const router = express.Router();
const auth = require("./controllers/auth");

router.get("/", (req, res) => {
    res.render('index', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/admin/users/create", (req,res) => {
    res.render('./admin/register', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/admin/login", (req,res) => {
    res.render('./admin/login', { title: 'URZISOFT', layout: './layouts/home' })
})
router.get("/blog/search", (req,res) => {
    res.render('search', { title: 'URZISOFT', layout: './layouts/home' })
})

router.get("/admin", admin.panel, loggedIn);

router.get("/admin/categories", admin.categories);
router.get("/admin/categories/delete/:categoryId", admin.deletecategory);
router.get("/admin/categories/create", admin.createcategory);
router.get("/admin/categories/edit/:categoryId", admin.editcategory);

router.get("/admin/users", admin.users);
router.get("/admin/users/edit/:usersId", admin.usersedit);
router.get("/admin/users/delete/:usersId", admin.usersdelete);

router.get("/admin/posts/create", admin.newpost);
router.get("/admin/posts", admin.checkposts);
router.get("/admin/posts/delete/:postId", admin.deletepost);
router.get("/admin/posts/edit/:postId", admin.editpost);
router.get("/admin/posts/:postId/comments", admin.comments);
router.get("/admin/posts/:postId/comments/edit/:commentsId", admin.editcomments);
router.get("/admin/posts/:postId/comments/delete/:commentsId", admin.deletecomments);



router.get("/blog", blog.posts);
router.get("/blog/post/:postId", blog.checkpost);


router.post("/admin/category/create", auth.createcategory);
router.post("/admin/categories/edit/:categoryId", auth.editcategory);
router.post("/admin/categories/delete/:categoryId", auth.deletecategory);

router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.post("/users/create", auth.register);
router.post("/blog", auth.blogComments);
router.post("/blog/search", auth.searchbar);

router.post("/admin/posts/create", auth.newpost);
router.post("/admin/posts/delete/:postId", auth.deletepost);
router.post("/admin/posts/edit/:postId", auth.editpost);
router.post("/admin/posts/edit/:postId/comments/edit/:commentsId", auth.editcomments);

router.post("/admin/users/edit/:userId", auth.usersedit);
router.post("/admin/users/delete/:userId", auth.usersdelete);


module.exports = router;