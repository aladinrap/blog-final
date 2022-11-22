const jwt = require("jsonwebtoken");
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
            return res.json({status: "ok", message: "User has been logged In"}) //return res.json with status success and message + cookie
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
                    return res.json({status: "success", message: "User has been registred"})
                })
            }
        })
    }
}

module.exports = {
    login: login,
    logout: logout,
    register: register,
}