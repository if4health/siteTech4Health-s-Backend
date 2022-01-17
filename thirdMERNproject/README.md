# IF4Health Site Management

![](https://if4health.netlify.app/logo/opt-if4health-halfsize.png)

This is my 3rd Node.JS project. I developed a static webpage for [IF4Health](https://if4health.netlify.app/) Research Group. Thus I decided to create a server to manage published works and students. The idea is to develop CRUDs for both sections - published works and students - while learning a bit of MERN stack. To start this project fast I used Express-generator tool.

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
http://localhost:3002/
```

## Routes
| Route                   | Method | Description                                                |
|-------------------------|--------|------------------------------------------------------------|
| `/`                     | GET    | Shows root homepage.                                       |
| `/students`             | GET    | Loads form and table of CRUD students.                     |
| `/students/:id`         | GET    | Loads form and data of a student.                          |
| `/students/myForm`      | POST   | Send student data to DB storage.                           |
| `/students/update/:id`  | PUT    | Upload a student status to finish an ongoing student work. |
| `/students/delete/:id`  | DELETE | Delete a student.                                          |
| `/works`                | GET    | Loads form containing only one work.                       |
| `/works/:id`            | GET    | Loads form containing only one work.                       |
| `/works/myForm`         | POST   | Send a work data to DB storage.                            |
| `/works/delete/:id`     | DELETE | Delete a published work by id.                             |