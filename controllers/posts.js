const e = require("express");
const db = require("../db-config");
const jwt = require("jsonwebtoken");

const index = (req, res) => {

    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM posts', (err, articles) => {
                if(err) throw err;
                    db.query("SELECT * FROM users", (err, users) => {
                    if(err) throw err;
                    db.query("SELECT * FROM categories", (err, category) => {
                        if(err) throw err;
                        return res.render('./admin/posts/index', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, articles, users, category});
                    })
                })
            })
        }
    }  

const create = (req, res) => {
    if(!req.user) return res.redirect("/admin/login");
    else {
            return res.render('./admin/posts/create', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
        }
    }    

const remove = (req, res) => {

    const postId = req.params.postId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            return res.render('./admin/posts/remove', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, post});
            })
        }
    }


const edit = (req, res) => {

    const postId = req.params.postId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
                db.query("SELECT * FROM categories", (err, category) => {
                    if(err) throw err;
                    return res.render('./admin/posts/edit', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, post, category});
                })
            })
        }
    }

    const add = (req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const userid = req.body.userid;
        db.query('INSERT INTO posts SET ?', {user_id:userid, title:title, content:content}, (err, results) => {
            if(err) throw err;
            return res.redirect('/admin/posts');
        })
    }
    
    const Delete = (req,res) => {
        const postid = req.params.postId;
        console.log(postid);
        db.query('DELETE FROM comments WHERE post_id = ?', [postid], (err, result) => {
            if(err) throw err;
            db.query('DELETE FROM posts WHERE id = ?', [postid], (err,result) => {
                if(err) throw err;
                return res.redirect('/admin/posts');
            })    
        })
    }
    
    const update = (req, res) => {
        const title = req.body.title;
        const content = req.body.content;
        const postid = req.body.postid;
        const categoryid = req.body.categoryid;
        db.query('UPDATE posts SET ? WHERE id = ?',[{title:title, content:content, category_id:categoryid}, postid], (err, result) => {
            if(err) throw err;
            return res.redirect('/admin/posts');
        })
    }

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    add: add,
    Delete: Delete,
    update: update,
}