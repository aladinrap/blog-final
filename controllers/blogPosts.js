const db = require("../db-config");
const e = require("express");

const blogPosts = (req, res) => {
    db.query("SELECT * FROM posts WHERE user_id = ?", [req.user.id], (err, result) => {
        if(err) throw err;
        if(!result.length){ 
            res.render("blog", { title: 'REGISTER URZISOFT', layout: './layouts/home' });
        }
    })
}


module.exports = blogPosts;
