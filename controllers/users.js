const e = require("express");
const db = require("../db-config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");


const signupSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    password_repeat: Joi.string().min(3).max(10).required(),
});
   

const index = (req, res) => {
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM users', (err, users) => {
                return res.render('./admin/users/index', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        }
}

const create = (req, res) => {
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM users', (err, users) => {
                return res.render('./admin/users/create', { title: 'URZISOFT', layout: './layouts/login', status: "ok", user: req.user, users});
            })
        }
}

const edit = (req, res) => {

    const usersId = req.params.usersId;

    if(!usersId) return res.redirect("./admin/users", {users: ""});
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM users WHERE id = ?', [usersId], (err, usersResult) => {
                let users = {
                    username: usersResult[0].username,
                    email: usersResult[0].email,
                    id: usersResult[0].id
                }
            return res.render('./admin/users/edit', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        }
    }    
const remove = (req, res) => {

    const usersId = req.params.usersId;

    if(!usersId) return res.redirect("./admin/users", {users: ""});
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query('SELECT * FROM users WHERE id = ?', [usersId], (err, usersResult) => {
                let users = {
                    username: usersResult[0].username,
                    email: usersResult[0].email,
                    id: usersResult[0].id
                }
            return res.render('./admin/users/remove', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
            })
        }
    }

    const update = (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const userId = req.params.userId;
        db.query('UPDATE users SET ? WHERE id = ?',[{username:username, email:email}, userId], (err, result) => {
            if(err) throw err;
            return res.redirect(`/admin/users`);
        })
    }
    const Delete = (req,res) => {
        const userId = req.params.userId;
        db.query('SELECT * FROM posts WHERE user_id = ?', [userId], (err, postResult) => {
            if(err) throw err;
            for(var i = 0; i<postResult.length; i++) {
                db.query('DELETE FROM comments WHERE post_id = ?', [postResult[i].id], (err, Result) => {
                    if(err) throw err;
                }) 
            }   
            db.query('DELETE FROM posts WHERE user_id = ?', [userId], (err, Result) => {
                    if(err) throw err;
                    db.query('DELETE FROM users WHERE id = ?', [userId], (err, Results) => {
                        if(err) throw err;
                        return res.redirect(`/admin/users`);
                        }) 
                    })  
        })
    }

    const register = async (req, res) => {
        const email = req.body.email;
        const Npassword = req.body.password;
        const username = req.body.username;
        const { error, value} = signupSchema.validate(req.body);
        if(error) {
            console.log(error);
            res.redirect("back");
        }
        else{
        console.log(value);
        if( !email || !Npassword ) return res.json({ststus: "error", error:"Please Enter your email and password"});
        else {
            db.query('SELECT email FROM users WHERE email = ?', [email], async(err, result) => {
               if(err) throw err;
               if(result[0]) return res.json({ status: "error", message: "Email has already been registred"}) 
                else {
                    const password = await bcrypt.hash(Npassword, 8);
                    db.query('INSERT INTO users SET ?', {email:email, password:password, username:username}, (error, results) => {
                        if(error) throw error;
                        return res.redirect('/admin/users');
                    })
                }
            })
        }
    }
}
const emergency = async (req, res) => {   
                const password = await bcrypt.hash("admin", 8); 
                db.query("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password TEXT, username VARCHAR(255))", (err,result) => {
                    if(err) throw err;
                    db.query('INSERT INTO users SET ?', {email:"admin@gmail.com", password:password, username:"admin"}, (error, results) => {
                        if(error) throw error;
                        db.query("CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, title VARCHAR(255), content TEXT, category_id INT)", (err,result) => {
                            if(err) throw err;
                            db.query("CREATE TABLE comments (id INT AUTO_INCREMENT PRIMARY KEY, post_id INT, author VARCHAR(255), content TEXT)", (err,result) => {
                                if(err) throw err;
                                db.query("CREATE TABLE categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))", (err,result) => {
                                    if(err) throw err;
                                    db.query("CREATE TABLE password_reset (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, hash VARCHAR(255), reset_at TIMESTAMP NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, expires_at TIMESTAMP NULL)", (err,result) => {
                                        if(err) throw err;
                                        for(let i=1; i< 4; i++)
                                        {
                                            db.query('INSERT INTO posts SET ?', {user_id:"1", title:`Titlu ${i}`, content:"content"}, (error, results) => {
                                                if(error) throw error;
                                            })
                                            db.query('INSERT INTO categories SET ?', {name:`Category ${i}`}, (error, results) => {
                                                if(error) throw error;
                                            })
                                            for(let j=1; j< 4; j++)
                                            {
                                                db.query('INSERT INTO comments SET ?', {post_id:`${i}`, author:`Author ${j}`, content:`Content ${j}`}, (error, results) => {
                                                    if(error) throw error;
                                                })
                                            }
                                        }         
                                        return res.redirect('/admin');
                                    })        
                            })    
                        })    
                    })
                })
            })
        }

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    update: update,
    Delete: Delete,
    register: register,
    emergency: emergency,
}