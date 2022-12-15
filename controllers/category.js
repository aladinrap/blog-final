const e = require("express");
const db = require("../db-config");
const jwt = require("jsonwebtoken");

const index = (req, res) => {
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query("SELECT * FROM categories", (err, category) => {
                if(err) throw err;                
                db.query("SELECT * FROM posts", (err, articles) => {
                    if(err) throw err;
                    return res.render('./admin/category/index', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, category, articles});
            })
        })
    }
}

const create = (req, res) => {
    if(!req.user) return res.redirect("/admin/login");
    else {
        return res.render('./admin/category/create', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user});
    }
}  

const edit = (req, res) => {
    const categoryId = req.params.categoryId;
    if(!categoryId) return res.redirect("./admin/categories");
    if(!req.user) return res.redirect("/admin/login");
    else {
                db.query("SELECT * FROM categories WHERE id = ?", [categoryId], (err, categoryResult) => {
                    if(err) throw err;
                    let category = {
                        name: categoryResult[0].name,
                        id: categoryResult[0].id,
                    }
                    return res.render('./admin/category/edit', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, category});
            })
        }
    }


const remove = (req, res) => {
    const categoryId = req.params.categoryId;
    if(!categoryId) return res.redirect("./admin/category");
    if(!req.user) return res.redirect("/admin/login");
    else {
            db.query("SELECT * FROM categories WHERE id = ?", [categoryId], (err, categoryResult) => {
                if(err) throw err;
                let category = {
                    name: categoryResult[0].name,
                    id: categoryResult[0].id,
                }
                return res.render('./admin/category/remove', { title: 'URZISOFT', layout: './layouts/admin', status: "ok", user: req.user, category});
        })
    }
}

const update = (req, res) => {
    const name = req.body.name;
    const categoryId = req.params.categoryId;
    db.query('UPDATE categories SET ? WHERE id = ?',[{name:name}, categoryId], (err, result) => {
        if(err) throw err;
        return res.redirect('/admin/categories');
    })
}

const add = (req, res) => {
    const name = req.body.category;
    db.query('INSERT INTO categories SET ?', {name:name}, (err, results) => {
        if(err) throw err;
        return res.redirect('/admin/categories');
    })
}

const Delete = (req,res) => {
    const categoryId = req.params.categoryId;
    db.query('UPDATE posts SET category_id = NULL WHERE category_id = ?', [categoryId], (err, result) => {
        if(err) throw err;
        db.query('DELETE FROM categories WHERE id = ?', [categoryId], (err,result) => {
            if(err) throw err;
            return res.redirect('/admin/categories');
        }) 
    })
}
       

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    update: update,
    add: add,
    Delete: Delete
}