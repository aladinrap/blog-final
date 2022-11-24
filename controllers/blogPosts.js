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
                db.query("SELECT * FROM coments", (err, comments) => {
                    if(err) throw err;
                    if(!comments.length){ 
                        res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', user, articles, comments})
                    }
                    else {                   
                        res.render('blog', { title: 'URZI-BLOG', layout: './layouts/home', message: "No comments!", user, articles, comments})
                    }
                })              
            })
        }
    })
}   



module.exports = blogPosts;
