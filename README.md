# blog-final

Tehnologii folosite: 

● Backend: Express (NodeJS), REST APIs

● FrontEnd: HTML, Vanilla JS DOM, CSS, SASS with BEM, EJS

● Databases: MySQL



● CI/CD: Git

● Management: Github

● UI/UX: Figma


Site-ul la baza este un blog impartit in doua, partea de guests si partea de admin. Ca si guest poti intra si vizualiza articolele de pe site, poti cauta articole si poti adauga comentarii articolelor. Ca si admin poti crea postari(acestea sunt impartite pe categorii), edita si sterge postari, poti crea, edita si sterge categorii, poti edita si sterge comentarii si poti crea si sterge alti useri.

De asemenea site-ul dispune de un sistem de reset password cu link pe email.



Blog Features (guest)

 ✓ Home (Feed with search bar)
 
 ✓ Search results page
 
 ✓ View post
 
 ✓ Add comment
 




Features (admin)

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
 
 
 
Extra:

 ✓ View categories
 
 ✓ Create category*
 
 ✓ Delete category*
 



Guest Routes:

/ = home

/search?q=post+title = search + keyword

/post/{slug} = view post by slug

/admin/login

/admin/register

/admin/password-reset/{secret} = reset password page





Admin routes

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





Extra:

/admin/categories

/admin/categories/create

/admin/categories/delete



✓ Controller naming & function naming & route verbs (POST/GET)



✓ Route grouping & Middleware





✓ Default database migration file

⁃ Create tables

⁃ Assign foreign keys

⁃ Seeder for 1 admin user

⁃ Seeder for 3 categories

⁃ Seeder for 3 posts

⁃ Seeder for 3 comments per post

⁃ > Folder: database > database_init.js / user_seeder.js / categories_seeder.js / posts_seeder.js / comments_seeder.js


✓ Form Validation(Login&Register)

✓ Frontend responsive

✓ Refactor cu Sass si BEM (o pagina dim. Medie)
