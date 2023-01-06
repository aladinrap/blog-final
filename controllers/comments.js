const e = require("express");
const db = require("../db-config");

const index = (req, res) => {

    const postId = req.params.postId;

    if(!postId) return res.redirect("./admin/posts");
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                if(err) throw err;
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            db.query('SELECT * FROM comments WHERE post_id = ?', [postId], (err, comments) => {
                if(err) throw err;
            return res.render('./admin/comments/index', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
                })
            })
        }
    }
const edit = (req, res) => {

    const postId = req.params.postId;
    const commentsId = req.params.commentsId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});
    if(!commentsId) return res.redirect("back");
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            db.query('SELECT * FROM comments WHERE id = ?', [commentsId], (err, commentsResult) => {
                if(err) throw err;
                let comments = {
                    author: commentsResult[0].author,
                    content: commentsResult[0].content,
                    id: commentsResult[0].id
                }
            return res.render('./admin/comments/edit', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
                })
            })
        }
    }

const remove = (req, res) => {

    const postId = req.params.postId;
    const commentsId = req.params.commentsId;

    if(!postId) return res.redirect("./admin/posts", {post: ""});
    if(!commentsId) return res.redirect("back");
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM posts WHERE id = ?', [postId], (err, postResult) => {
                if(err) throw err;
                let post = {
                    title: postResult[0].title,
                    content: postResult[0].content,
                    id: postResult[0].id
                }
            db.query('SELECT * FROM comments WHERE id = ?', [commentsId], (err, commentsResult) => {
                if(err) throw err;
                let comments = {
                    author: commentsResult[0].author,
                    content: commentsResult[0].content,
                    id: commentsResult[0].id
                }
            return res.render('./admin/comments/remove', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, comments, post});
                })
            })
        }
    }

    const add = (req, res) => {
        const author = req.body.author;
        const content = req.body.content;
        const postId = req.body.postid;
        db.query('INSERT INTO comments SET ?', {post_id:postId, author:author, content:content}, (err, results) => {
            if(err) throw err;
            return res.redirect('back');
        })
    }    
    const update = (req, res) => {
        const author = req.body.author;
        const content = req.body.content;
        const postId = req.body.postid;
        const commentsid = req.body.commentid;
        db.query('UPDATE comments SET ? WHERE id = ?',[{author:author, content:content}, commentsid], (err, result) => {
            if(err) throw err;
            return res.redirect(`/admin/posts/${postId}/comments`);
        })
    }
    const Delete = (req,res) => {
        const commentsid = req.params.commentId;
        const postId = req.params.postId;
        db.query('DELETE FROM comments WHERE id = ?', [commentsid], (err, result) => {
            if(err) throw err;
            res.redirect(`/admin/posts/${postId}/comments`);    
        })
    }
    

module.exports = {
    index: index,
    edit: edit,
    remove: remove,
    add: add,
    update: update,
    Delete: Delete
}