const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const db = require("../db-config");
const bcrypt = require("bcryptjs");
const { users } = require("./admin");
const generateHash = require("random-hash");
const nodemailer= require("nodemailer");
const { restart } = require("nodemon");
const Joi = require("joi");


const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
});
   

const login = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password; 
    const { error, value} = signupSchema.validate(req.body);
    if(error) {
        console.log(error);
        res.redirect("back");
    }
    else{
        console.log(value);
    if( !email || !password ) return res.json({status: "error", error:"Please Enter your email and password"}); // Input validation
    else {
        db.query('SELECT * FROM users WHERE email = ?', [email], async(Err, result) => { //Search user with entered email
           if(Err) throw Err;
           if(!result.length || !await bcrypt.compare(password, result[0].password)) return res.redirect("back");
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
}
const logout = (req, res) => {
    res.clearCookie("userRegistred");
    res.redirect("/");
}


// UPDATE comments SET ? WHERE id = ?  
module.exports = {
    login: login,
    logout: logout,
}