# Tattoo E-Shop in Express.js

--

## Introduction

This project's aim is to build a simple e-shop with CRUD logic using **Express.js**.

Only the backend part was developed for this project, meaning no HTML/CSS files (client side) were added.

For development and testing purposes, I used the [**Postman API platform**](https://www.postman.com/).

--

## Requirements

In order to run this project on your machine, you will need:

- Node.js
- a package manager
- a database

### Node.js

Open your terminal or command interface. Type:

`node --version` or `node -v`

Is it installed? If not, follow the steps on [NodeJs](https://nodejs.org/en/) website.
Choose a version (LTS recommended) and follow the default options when installing.

### Package Manager

It should have been automatically installed with NodeJs. In your terminal, check of you have it by typing:

`npm --version` or `npm -v`

### Database

...

--

## Installation

Open your terminal and clone the repository:

`git clone` followed by the name of the repo (use the SSH keys)

Navigate to the newly cloned project folder:

`cd ...`

Install the necessary dependencies in the root of your project by running:

`npm init -y` to use the default setup, OR

`npm init` and then answer the questions to initialize the **package.json** file.

Now, create a new database called **tattoo_eshop**. It should contain the following tables:

...
...
...

Create a new **.env** file in your root folder. Copy the contents of the **.env.example** in it. Then set the configuration and the database connection (you can change them according to your preferred settings).

HOST=**localhost**
PORT=**3001**
DB_NAME=**tattoo_eshop**
DB_USER=**root**
DB_PORT=**3306**
DB_HOST=**localhost**
DB_PASSWORD=**your password here**

**_IMPORTANT!_** Add a **.gitignore** file to your project folder if you don't have one already.

- Add the **.env** file to your **.gitignore** to avoid sharing your password if you decide to push the project to a remote repository!
- Add **node_modules** as well to avoid pushing them remotely (they're very heavy).

From your terminal, go to the server folder and run:

`npm run dev`

to start running the local server.

Open http://localhost:3001 in your browser.

--

## Main Features

A landing page
A shop page (with all products)
The whole CRUD logic for the products
Have a dynamic route for detail pages
Grouping routes with Express routings
Create a database connection
Add validation middleware to POST routes that receive form information (check if body parameters exist and are all consistent when submitting a front end form)
Correct (code) status responses
Generate a 404 response on all non-existing routes
Send data back as JSON

--

Beatrice Schembri - 2023 - BeCode Ghent
