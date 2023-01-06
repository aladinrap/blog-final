const db = require("../db-config");
const e = require("express");
const dotenv = require("dotenv").config();

const index = (req, res) => {

    db.query("SELECT * FROM posts", (err, articles) => {
        if(err) throw err;
        if(!articles.length){ 
            res.redirect("/");
        }
        else {           
            db.query("SELECT * FROM users", (err, users) => {
                if(err) throw err;
                db.query("SELECT * FROM comments", (err, comments) => {
                    if(err) throw err;  
                    db.query("SELECT * FROM categories", (err, category) => {
                        if(err) throw err;
                        db.query("SELECT * FROM images", (err, images) => {
                            if(err) throw err;
                            res.render('./index', { title: 'URZISOFT', layout: './layouts/home', users, articles, comments, category, images})
                        })
                    })    
                })              
            })
        }
    })
}

module.exports = {
    index: index,
};