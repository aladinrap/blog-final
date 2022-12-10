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
                    return res.render('./admin/index', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
        })
        } catch(err) {
        if(err) throw err;
    }
}

const createcategory = (req, res) => {

    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
                    return res.render('./admin/createcategory', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
        })
        } catch(err) {
        if(err) throw err;
    }
}

const categories = (req, res) => {

    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query("SELECT * FROM categories", (err, category) => {
                if(err) throw err;                
                db.query("SELECT * FROM posts", (err, articles) => {
                    if(err) throw err;
                    return res.render('./admin/categories', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, category, articles});
            })
            })
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
                return res.render('./admin/users', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
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
            return res.render('./admin/usersedit', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
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
            return res.render('./admin/usersdelete', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const deletecategory = (req, res) => {

    const categoryId = req.params.categoryId;

    if(!categoryId) return res.redirect("./admin/category");


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
            db.query("SELECT * FROM categories WHERE id = ?", [categoryId], (err, categoryResult) => {
                if(err) throw err;
                let category = {
                    name: categoryResult[0].name,
                    id: categoryResult[0].id,
                }
                return res.render('./admin/deletecategory', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, category});
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
                    db.query("SELECT * FROM categories", (err, category) => {
                        if(err) throw err;
                        return res.render('./admin/checkposts', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, articles, users, category});
                    })
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
            return res.render('./admin/newpost', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
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
            return res.render('./admin/deletepost', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, post});
            })
        })
        } catch(err) {
        if(err) throw err;
    }
}

const editcategory = (req, res) => {

    const categoryId = req.params.categoryId;

    if(!categoryId) return res.redirect("./admin/categories");


    if(!req.cookies.userRegistred) return res.redirect('/admin/login');
    try{
        const decoded = jwt.verify(req.cookies.userRegistred, process.env.JWT_SECRET)
        db.query('SELECT * FROM users WHERE id=?', [decoded.id], (err, result) => {
            if(err) return next();
            req.user = result[0];
                db.query("SELECT * FROM categories WHERE id = ?", [categoryId], (err, categoryResult) => {
                    if(err) throw err;
                    let category = {
                        name: categoryResult[0].name,
                        id: categoryResult[0].id,
                    }
                    return res.render('./admin/editcategory', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, category});
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
                db.query("SELECT * FROM categories", (err, category) => {
                    if(err) throw err;
                    return res.render('./admin/editpost', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, post, category});
                })
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
            return res.render('./admin/checkcomments', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
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
            return res.render('./admin/editcomments', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
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
            return res.render('./admin/deletecomments', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
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
    categories: categories,
    createcategory: createcategory,
    editcategory: editcategory,
    deletecategory: deletecategory,
};