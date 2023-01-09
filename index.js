const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const dotenv = require("dotenv").config();
const db = require("./db-config");
const app = express();
const cookie = require("cookie-parser");
const bodyParser = require('body-parser');
const path = require("path");
const adminRoute = require("./routes/admin");
const categoriesRoute = require("./routes/categories");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const passwordRoute = require("./routes/password");
const blogRoute = require("./routes/blog");
const PORT = process.env.PORT || 5000;



app.use(cookie());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./routes/routes"));

app.use("/admin", adminRoute);
app.use("/admin/categories", categoriesRoute);
app.use("/admin/users", usersRoute);
app.use("/admin/posts", postsRoute);
app.use("/admin/posts/comments", commentsRoute);
app.use("/admin/password", passwordRoute);
app.use("/blog", blogRoute);


db.connect((err) => {
    if(err) throw err;
    console.log("database connected");
})
app.listen(PORT);