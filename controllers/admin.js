const e = require("express");
const db = require("../db-config");
const jwt = require("jsonwebtoken");

const panel = (req, res) => {

    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            return res.render('./admin/index', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
        })
        } catch(err) {
        if(err) throw err;
    }
}

const users = (req, res) => {

    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM users', (err, users) => {
                return res.render('./admin/users', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const usersedit = (req, res) => {

    const usersId = req.params.usersId;

    if(!usersId) return res.redirect("./admin/users", {users: ""});


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM users WHERE id = ?', [usersId], (err, usersResult) => {
                let users = {
                    username: usersResult[0].username,
                    email: usersResult[0].email,
                    id: usersResult[0].id
                }
            return res.render('./admin/usersedit', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}
const usersdelete = (req, res) => {

    const usersId = req.params.usersId;

    if(!usersId) return res.redirect("./admin/users", {users: ""});


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM users WHERE id = ?', [usersId], (err, usersResult) => {
                let users = {
                    username: usersResult[0].username,
                    email: usersResult[0].email,
                    id: usersResult[0].id
                }
            return res.render('./admin/usersdelete', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const checkposts = (req, res) => {

    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM posts', (err, articles) => {
                if(err) throw err;
                    db.query("SELECT * FROM users", (err, users) => {
                    if(err) throw err;
                    return res.render('./admin/checkposts', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, articles, users});
                    })
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}  

const newpost = (req, res) => {

    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            return res.render('./admin/newpost', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
        })
        } catch(err) {
        if(err) throw err;
    }
}  

const deletepost = (req, res) => {

    const postId = req.params.postId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            return res.render('./admin/deletepost', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, post});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const editpost = (req, res) => {

    const postId = req.params.postId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            return res.render('./admin/editpost', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, post});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const comments = (req, res) => {

    const postId = req.params.postId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            db.query('SELECT * FROM coments WHERE post_id = ?', [postId], (err, comments) => {
            return res.render('./admin/checkcomments', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
                })
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}
const editcomments = (req, res) => {

    const postId = req.params.postId;
    const commentsId = req.params.commentsId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});
    if(!commentsId) return res.redirect("back");


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            db.query('SELECT * FROM coments WHERE id = ?', [commentsId], (err, commentsResult) => {
                if(err) throw err;
                let comments = {
                    author: commentsResult[0].author,
                    content: commentsResult[0].content,
                    id: commentsResult[0].id
                }
            return res.render('./admin/editcomments', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
                })
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const deletecomments = (req, res) => {

    const postId = req.params.postId;
    const commentsId = req.params.commentsId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});
    if(!commentsId) return res.redirect("back");


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                if(err) throw err;
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            db.query('SELECT * FROM coments WHERE id = ?', [commentsId], (err, commentsResult) => {
                if(err) throw err;
                let comments = {
                    author: commentsResult[0].author,
                    content: commentsResult[0].content,
                    id: commentsResult[0].id
                }
            return res.render('./admin/deletecomments', { title: 'Login URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
                })
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}


module.exports = {
    newpost: newpost,
    checkposts: checkposts,
    panel: panel,
    deletepost: deletepost,
    editpost: editpost,
    comments: comments,
    editcomments: editcomments,
    deletecomments: deletecomments,
    users: users,
    usersedit: usersedit,
    usersdelete:usersdelete,
};