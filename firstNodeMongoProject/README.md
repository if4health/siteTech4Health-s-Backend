# IF4Health Site Management

![](https://if4health.netlify.app/logo/opt-if4health-halfsize.png)

This is my first Node.JS project. I developed a static webpage for [IF4Health](https://if4health.netlify.app/) Research Group. Thus I decided to create a server to manage published works and students. The idea is to develop CRUDs for both sections - published works and students - while learning a bit of MERN stack. I will deploy this application when ready, but I have a lot to learn.

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
mkdir uploads
npm dev start
```
You should be able to access the running server in a web browser:
```sh
http://localhost:3000/
```

## Routes
| Route              | Method | Description                                                                                       |
|--------------------|--------|-------------------------------------------------------------------------------------------------|
| `/myForm`          | POST   | Send student data to DB storage                                                                 |
| `/`                | GET    | Loads form and table of CRUD students.                                                          |
| `/see`             | PUT    | Upload a student status to finish an ongoing student work. Search by student name.              |
| `/remove`          | DELETE | Delete a student. Search by student name. You cannot edit a student. Just insert and delete =)  |
