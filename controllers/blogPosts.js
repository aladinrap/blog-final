const db = require("../db-config");
const e = require("express");

const blogPosts = (req, res) => {

    db.query("SELECT * FROM posts", (err, articles) => {
        if(err) throw err;
        if(!articles.length){ 
            res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', message: "Articles no more avaible!" })
        }
        else {           
            db.query("SELECT * FROM users", (err, user) => {
                if(err) throw err;          
            res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', message: "Doua articole disponibile!", user, articles})
            })
        }
    })
}   



module.exports = blogPosts;
