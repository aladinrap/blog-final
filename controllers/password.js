const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const db = require("../db-config");
const bcrypt = require("bcryptjs");
const { users } = require("./admin");
const generateHash = require("random-hash");
const nodemailer= require("nodemailer");
const { restart } = require("nodemon");


const reset = (req,res) => {
    const hashId = req.params.hashId;
    const userId = req.params.userId;
    db.query("SELECT * FROM password_reset WHERE hash = ?", [hashId], (err,hashResult) => {
       if(err) throw err;
       if(!hashResult.length) res.redirect('/admin/login');
       else{
           return res.render('./admin/password/update', { title: 'URZISOFT', layout: './layouts/home', hashId:hashId, userId:userId });
       }
    })
   }

   const request = (req,res) => {
    const email = req.body.email;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, usersResult) => {
        if(err) throw err;
        if(!usersResult.length) res.redirect("back");
        else {
            const user = {
                id: usersResult[0].id,
                email: usersResult[0].email,
            }
            let hash = generateHash.generateHash();
            let expires = new Date();
            expires = new Date(expires.getTime() + 30 * 60 * 1000);
            console.log(expires);
             db.query('INSERT INTO password_reset SET ?', {user_id:user.id, hash:hash, expires_at:expires}, (err,results) => {
                 if(err) throw err;
                 res.redirect("/admin/login");
                 let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "chiper.adelin01@gmail.com",
                        pass: "bavdwpgoieovjpws"
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                })
                let mailOptions = {
                    from: "chiper.adelin01@gmail.com",
                    to: `${user.email}`,
                    subject: "Reset password link",
                    text: `
                    ATENTIE! Ai doar 30 de minute la dispozitie!
                    http://localhost:5000/admin/password/reset/${hash}`
                }
                transporter.sendMail(mailOptions, function(err, success){
                    if(err) {
                       console.log(err); 
                    } else {
                        console.log("Succesfully!");
                    }
                })
             })
        }
    })
}

const update = async (req,res) => {
    const hashId = req.body.hashId;
    const Npassword = req.body.password;
    const Nrepassword = req.body.repassword;
    if(Npassword!=Nrepassword) res.redirect('back');
    else{
        const password = await bcrypt.hash(Npassword, 8);
        db.query('SELECT * FROM password_reset WHERE hash = ?', [hashId], (err,token) => {
            let reset_at = new Date();
            let request = {
                userId: token[0].user_id
            }
            if(token[0].reset_at!=null || reset_at > token[0].expires_at)
            {
                res.redirect('/admin/password/reset');
            }
            else{
            db.query('UPDATE users SET ? WHERE id = ?',[{password:password}, request.userId], (err, results) => {
                if(err) throw err;
                else {
                    db.query('UPDATE password_reset SET ? WHERE hash = ?', [{reset_at:reset_at}, hashId], (err,Result) => {
                        if(err) throw err;
                        console.log("succes!");
                        return res.redirect("/admin/login");
                        })
                    }
                })
            }
        })
    }
}

   module.exports = {
    reset: reset,
    request: request,
    update: update,
};   