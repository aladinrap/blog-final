# blog-final

<b> POZE: </b> https://imgur.com/a/VHkU8sL

<br>
Site-ul la baza este un blog impartit in doua planuri, partea de guests si partea de admin. Ca si guest poti intra si vizualiza articolele de pe site, poti cauta articole si poti adauga comentarii articolelor. Ca si admin poti crea postari(acestea sunt impartite pe categorii), edita si sterge postari, poti crea, edita si sterge categorii, poti edita si sterge comentarii si poti crea si sterge alti useri.
<br>
De asemenea site-ul dispune de un sistem de reset password cu link pe email.
<br>

<b>Tehnologii folosite:</b><br> 

● Backend: Express (NodeJS), REST APIs

● FrontEnd: HTML, Vanilla JS DOM, CSS, SASS with BEM, EJS

● Databases: MySQL



● CI/CD: Git

● Management: Github

● UI/UX: Figma


<br>

<b>How to run it</b>

<b>1.JSON Package needs:</b>


"bcryptjs": "^2.4.3",

"boxicons": "^2.1.4",

"cookie-parser": "^1.4.6",

"dotenv": "^16.0.3",

"ejs": "^3.1.8",

"express": "^4.18.2",

"express-ejs-layouts": "^2.5.1",

"joi": "^17.7.0",

"jsonwebtoken": "^8.5.1",

"multer": "^1.4.5-lts.1",

"mysql": "^2.18.1",

"nodemailer": "^6.8.0",

"nodemon": "^2.0.20",

"path": "^0.12.7",

"random-hash": "^4.0.1"

<b>2.Database tables:</b><br>
https://imgur.com/a/dsi2fp5
<br>

<b>3.Use "nodemon" in terminal to run server. Puteti accesa "localhost:5000/admin/users/emergency" pentru a crea tabele in baza de date si un cont de admin. Acesta va mai genera si 3 postari cu cate 3 comentarii fiecare si 3 categorii.</b>



<b>Blog Features (guest)</b><br>

 ✓ Home (Feed with search bar)
 
 ✓ Search results page
 
 ✓ View post
 
 ✓ Add comment
 



<br>
<b>Features (admin)</b><br>

 ✓ Login
 
 ✓ Register
 
 ✓ Reset password (with reset link)
 
 ✓ View posts
 
 ✓ Create post
 
 ✓ Create post with (WYSIWYG editor)
 
 ✓ Edit post (update)
 
 ✓ Delete post
 
 ✓ Manage comments
 
 ✓ View users
 
 ✓ Create user
 
 ✓ Edit user
 
 ✓ Delete user
 
 ✓ Master admin (can see all posts and manage users)
 
 
<br> 
<b>Extra:</b><br>

 ✓ View categories
 
 ✓ Create category*
 
 ✓ Delete category*
 


<br>
<b>Guest Routes:</b><br>

/ = home

/search?q=post+title = search + keyword

/post/{slug} = view post by slug

/admin/login

/admin/register

/admin/password-reset/{secret} = reset password page




<br>
<b>Admin routes</b><br>

/admin = Admin dashboard

/admin/posts

/admin/posts/create

/admin/posts/edit/{id}

/admin/posts/update

/admin/posts/delete

/admin/comments

/admin/comments/delete

/admin/users

/admin/users/edit

/admin/users/update

/admin/users/delete




<br>
<b>Extra:</b><br>

/admin/categories

/admin/categories/create

/admin/categories/delete


<br>
✓ Controller naming & function naming & route verbs (POST/GET)


<br>
✓ Route grouping & Middleware




<br>
✓ Default database migration file

⁃ Create tables

⁃ Assign foreign keys

⁃ Seeder for 1 admin user

⁃ Seeder for 3 categories

⁃ Seeder for 3 posts

⁃ Seeder for 3 comments per post

⁃ > Folder: database > database_init.js / user_seeder.js / categories_seeder.js / posts_seeder.js / comments_seeder.js

<br>
✓ Form Validation(Login&Register)

✓ Frontend responsive

✓ Refactor cu Sass si BEM (o pagina dim. Medie)
