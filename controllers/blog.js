const db = require("../db-config");
const e = require("express");

const posts = (req, res) => {

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



const checkpost = (req, res) => {

    const postId = req.params.postId;

    db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, postResult) => {
        if(err) throw err;
        let post = {
            title: postResult[0].title,
            content: postResult[0].content,
            user_id: postResult[0].user_id,
            id: postResult[0].id
        }         
            db.query("SELECT * FROM users WHERE id = ?", [post.user_id], (err, userResult) => {
                if(err) throw err;
                let user = {
                    id: userResult[0].id,
                    email: userResult[0].email,
                    username: userResult[0].username
                }
                db.query("SELECT * FROM coments WHERE post_id = ?",  [postId], (err, comments) => {
                    if(err) throw err;                  
                        res.render('checkpost', { title: 'URZI-BLOG', layout: './layouts/home', user, post, comments})
                })              
            })
        })
    }
   



module.exports = {
posts: posts,
checkpost: checkpost,
};
