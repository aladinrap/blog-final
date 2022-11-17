const express = require("express");
const db = require("./routes/db-config");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use("/js", express.static(__dirname + "./public/js"))
app.use("/css", express.static(__dirname + "./public/css"))

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("views", express.static(__dirname + "./public"))

app.use(cookie());
app.use(express.json());

app.use("/", require("./routes/pages"));

app.use("/js", express.static(__dirname + "/views/js"));
app.use("/css", express.static(__dirname + "/views/css"));
app.use(express.static('views'));

db.connect((err) => {
    if(err) throw err;
    console.log("database connected");
})
app.listen(PORT);