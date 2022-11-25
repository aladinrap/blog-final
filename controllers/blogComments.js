const db = require("../db-config");
const e = require("express");

const blogComments = (req, res) => {
    const author = req.body.author;
    const content = req.body.content;
    const postId = req.body.comment;
    db.query('INSERT INTO coments SET ?', {author:author, content:content, post_id:postId}, (req, res) => {
        return res.json({status: "success", message: "User has been registred"});
    })
}   



module.exports = blogComments;
