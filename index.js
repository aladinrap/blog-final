const express = require("express");
const expressLayouts = require('express-ejs-layouts')
const db = require("./db-config");
const app = express();
const cookie = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(cookie());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./routes"));


db.connect((err) => {
    if(err) throw err;
    console.log("database connected");
})
app.listen(PORT);