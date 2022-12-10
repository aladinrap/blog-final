const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const db = require("../db-config");
const bcrypt = require("bcryptjs");

const login = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password; 
    if( !email || !password ) return res.json({status: "error", error:"Please Enter your email and password"}); // Input validation
    else {
        db.query('SELECT * FROM users WHERE email = ?', [email], async(Err, result) => { //Search user with entered email
           if(Err) throw Err;
           if(!result.length || !await bcrypt.compare(password, result[0].password)) return res.json({status: "error", //Throw error if results == 0 || passwords don't match
        message: "Incorrect Email or Password"})
        else { // If user exists & passwords match - good
            const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { //create JWT token
                expiresIn: process.env.JWT_EXPIRES //set expire
            })
            const cookieOptions = { //create cookie object
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000), //cookie expire
            http0nly: true //security standard thing
            }
            res.cookie("userRegistred", token, cookieOptions); // set userRegistered cookie
            return res.redirect('/admin'); //return res.json with status success and message + cookie
            }
        })
    }
}

const logout = (req, res) => {
    res.clearCookie("userRegistred");
    res.redirect("/");
}

const register = async (req, res) => {
    const email = req.body.email;
    const Npassword = req.body.password;
    const username = req.body.username;
    if( !email || !Npassword ) return res.json({ststus: "error", error:"Please Enter your email and password"});
    else {
        console.log(email);
        db.query('SELECT email FROM users WHERE email = ?', [email], async(err, result) => {
           if(err) throw err;
           if(result[0]) return res.json({ status: "error", message: "Email has already been registred"}) 
            else {
                const password = await bcrypt.hash(Npassword, 8);
                console.log(password);
                db.query('INSERT INTO users SET ?', {email:email, password:password, username:username}, (error, results) => {
                    if(error) throw error;
                    return res.redirect('/admin');
                })
            }
        })
    }
}

const blogComments = (req, res) => {
    const author = req.body.author;
    const content = req.body.content;
    const postId = req.body.postid;
    db.query('INSERT INTO coments SET ?', {post_id:postId, author:author, content:content}, (err, results) => {
        if(err) throw err;
        return res.redirect('back');
    })
}   


const createcategory = (req, res) => {
    const name = req.body.category;
    db.query('INSERT INTO categories SET ?', {name:name}, (err, results) => {
        if(err) throw err;
        return res.redirect('/admin/categories');
    })
}

const newpost = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const userid = req.body.userid;
    db.query('INSERT INTO posts SET ?', {user_id:userid, title:title, content:content}, (err, results) => {
        if(err) throw err;
        return res.redirect('/admin/posts');
    })
}

const deletepost = (req,res) => {
    const postid = req.params.postId;
    console.log(postid);
    db.query('DELETE FROM coments WHERE post_id = ?', [postid], (err, result) => {
        if(err) throw err;
        db.query('DELETE FROM posts WHERE id = ?', [postid], (err,result) => {
            if(err) throw err;
            return res.redirect('/admin/posts');
        })    
    })
}

const editpost = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const postid = req.body.postid;
    const categoryid = req.body.categoryid;
    console.log(categoryid);
    db.query('UPDATE posts SET ? WHERE id = ?',[{title:title, content:content, category:categoryid}, postid], (err, result) => {
        if(err) throw err;
        return res.redirect('/admin/posts');
    })
}

const editcomments = (req, res) => {
    const author = req.body.author;
    const content = req.body.content;
    const postId = req.body.postid;
    const commentsid = req.body.commentsid;
    db.query('UPDATE coments SET ? WHERE id = ?',[{author:author, content:content}, commentsid], (err, result) => {
        if(err) throw err;
        return res.redirect(`/admin/posts/${postId}/comments`);
    })
}

const deletecategory = (req,res) => {
    const categoryId = req.params.categoryId;
    db.query('UPDATE posts SET category = NULL WHERE category = ?', [categoryId], (err, result) => {
        if(err) throw err;
        db.query('DELETE FROM categories WHERE id = ?', [categoryId], (err,result) => {
            if(err) throw err;
            return res.redirect('/admin/categories');
        }) 
    })
}

const editcategory = (req, res) => {
    const name = req.body.name;
    const categoryId = req.params.categoryId;
    db.query('UPDATE categories SET ? WHERE id = ?',[{name:name}, categoryId], (err, result) => {
        if(err) throw err;
        return res.redirect('/admin/categories');
    })
}

const usersedit = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const userid = req.body.userid;
    db.query('UPDATE users SET ? WHERE id = ?',[{username:username, email:email}, userid], (err, result) => {
        if(err) throw err;
        return res.redirect(`/admin/users`);
    })
}
const usersdelete = (req,res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM posts WHERE user_id = ?', [userId], (err, postResult) => {
        if(err) throw err;
        for(var i = 0; i<postResult.length; i++) {
            db.query('DELETE FROM coments WHERE post_id = ?', [postResult[i].id], (err, Result) => {
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
const searchbar = (req,res) => {
    const search = req.body.searchinput;
    db.query('SELECT * FROM posts', (err, articles) => {
        if(err) throw err;
            res.render('startsearch', { title: 'Login URZISOFT', layout: './layouts/home', message: "Acestea sunt articolele gasite:", articles, search:search});
    })
}

module.exports = {
    login: login,
    logout: logout,
    register: register,
    blogComments: blogComments,
    newpost: newpost,
    deletepost: deletepost,
    editpost: editpost,
    editcomments: editcomments,
    usersedit: usersedit,
    usersdelete: usersdelete,
    searchbar: searchbar,
    createcategory: createcategory,
    editcategory: editcategory,
    deletecategory: deletecategory,
}