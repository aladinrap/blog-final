const e = require("express");
const db = require("../db-config");
const jwt = require("jsonwebtoken");

const panel = (req, res) => {   
    if(!req.user) return res.redirect("/admin/login");
    else {
    return res.render('./admin/index', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user}); }
}

module.exports = {
    panel: panel,
};