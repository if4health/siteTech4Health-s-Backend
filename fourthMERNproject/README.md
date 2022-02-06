# IF4Health Site Management

![](https://if4health.netlify.app/logo/opt-if4health-halfsize.png)

This is my 4th Node.JS project. The goal of this project is to learn how to build my application with Docker containers. Most of Cloud Free services support Docker container for deploying webapps. Once I intend to publish this tool online, I need to understand how to deploy an application online for real.

I could connect my app in Atlas but I do not like the idea of having the DB and the API running in different clouds. Therefore I am using 2 containers - a MongoDB container and an API container - because I want DB and API on the same server. 

To enable my project decision, I have to learn how to use Docker Compose and DotEnv Node package. The nicest thing about this project is I can use MongoDB without installing it in my local machine by running the MongoDB container. I am also using authentication when connecting to MongoDB. You can access MongoDB running in the container by the following command:

```sh
mongosh --port 27017 -u mongoadmin -p  --authenticationDatabase 'admin'
```

## Requirements
- NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
- NPM [https://www.python.org/downloads/](https://www.npmjs.com/)
- MongoDB [https://www.mongodb.com/](https://www.mongodb.com/)

## Installation
Install dependecies described in `package.json`
```sh
npm install
```
## Usage - Docker
Rename `.env.example` to `.env` and set up enviromental variables. Use `DB_HOST=DB_IF4HEALTH`. *DB_IF4HEALTH* is the container name defined in docker-container.yml.

Open a terminal and go to the project directory.
```sh
# Run in Docker. -d flag to run in background
docker-compose up -d

# Tear down
docker-compose down

# To re-build
docker-compose build

# To debug
docker-compose logs -f
```

You should be able to access the running server in a web browser:
```sh
http://localhost:3003/
```

## Usage - Local
Rename `.env.example` to `.env` and set up enviromental variables. Use `DB_HOST=localhost`.

Open a terminal, go to the project directory, create directory for uploads, and start the server.
```sh
cd <this_project_dir>
mkdir uploads/images
mkdir uploads/pdf
npm run start
```
You should be able to access the running server in a web browser:
```sh
http://localhost:3003/
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