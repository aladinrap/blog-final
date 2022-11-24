const db = require("../db-config");
const e = require("express");

const blogComments = (req, res) => {

    db.query("SELECT * FROM coments WHERE post_id = ?", (err, comments) => {
        if(err) throw err;
        if(!comments.length){ 
            res.send('blog', { message: "No comments!" })
        }
        else {                   
            res.send('blog', { comments, message: "Doua articole disponibile!", user, articles})
        }
    })
}   



module.exports = blogComments;
