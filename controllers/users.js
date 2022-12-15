const e = require("express");
const db = require("../db-config");
const jwt = require("jsonwebtoken");

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
                return res.render('./admin/users/create', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, users});
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

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    update: update,
    Delete: Delete,
    register: register
}