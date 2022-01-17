# IF4Health Site Management

![](https://if4health.netlify.app/logo/opt-if4health-halfsize.png)

This is my 2nd Node.JS project. The goal of this project is to learn how to properly deploy a NodeJS server containing multiple features and routes. Therefore, I started this projct by using [Express-Generator](https://expressjs.com/pt-br/starter/generator.html) tool to generate the basic app structure. Next, I adapted students CRUD to this automated structure. Finally, I included the development of a CRUD for published works management.

## Requirements
- NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
- NPM [https://www.python.org/downloads/](https://www.npmjs.com/)
- MongoDB [https://www.mongodb.com/](https://www.mongodb.com/)

## Installation
Install dependecies described in `package.json`
```sh
npm install
```

## Usage
Open a terminal, go to the project directory, create directory for uploads, and start the server.
```sh
cd <this_project_dir>
mkdir uploads/images
mkdir uploads/pdf
npm dev start
```
You should be able to access the running server in a web browser:
```sh
http://localhost:3001/
```

## Routes
| Route                   | Method | Description                                                |
|-------------------------|--------|------------------------------------------------------------|
| `/`                     | GET    | Shows root homepage.                                       |
| `/students`             | GET    | Loads form and table of CRUD students.                     |
| `/students/:id`         | GET    | Loads form and data of a student.                          |
| `/students/myForm`      | POST   | Send student data to DB storage.                           |
| `/students/update/:id`  | PUT    | Upload a student status to finish an ongoing student work. |
| `/students/updateDB`    | PUT    | Finish an ongoing student work. Search by student name.    |
| `/students/delete/:id`  | DELETE | Delete a student.                                          |
| `/students/deleteDB`    | DELETE | Delete one student. Search by student name.                |
| `/works`                | GET    | Loads form containing only one work.                       |
| `/works/:id`            | GET    | Loads form containing only one work.                       |
| `/works/myForm`         | POST   | Send a work data to DB storage.                            |
| `/works/delete/:id`     | DELETE | Delete a published work by id.                             |
| `/works/deleteDB`       | DELETE | Delete a published work. Search by student name.           |
