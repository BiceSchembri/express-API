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

...

You will also have to configure your own database connection.

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

Now, create a new database called **tattoo_eshop** It should contain the following tables:

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

...

--

Beatrice Schembri - 2023 - BeCode Ghent
