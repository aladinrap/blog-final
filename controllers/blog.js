const db = require("../db-config");
const e = require("express");

const seeposts = (req, res) => {

    db.query("SELECT * FROM posts", (err, articles) => {
        if(err) throw err;
        if(!articles.length){ 
            res.redirect("/");
        }
        else {           
            db.query("SELECT * FROM users", (err, users) => {
                if(err) throw err;
                db.query("SELECT * FROM coments", (err, comments) => {
                    if(err) throw err;                  
                        res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', users, articles, comments})
                })              
            })
        }
    })
}   



module.exports = {
seeposts: seeposts,
};
