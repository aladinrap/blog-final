const db = require("../db-config");
const e = require("express");

const blogPosts = (req, res) => {

    db.query("SELECT * FROM posts", (err, articles) => {
        if(err) throw err;
        if(!articles.length){ 
            res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', message: "Articles no more avaible!" })
        }
        else {
            
            db.query("SELECT * FROM users WHERE id = ?", [articles[0].user_id], (err, user) => {
                if(err) throw err;
                console.log([articles[3].user_id]);
                let username = user[0].username;
            
            res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', message: "Doua articole disponibile!", articles, username })
            })
        }
    })
}   



module.exports = blogPosts;
