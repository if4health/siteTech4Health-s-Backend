const express = require('express');
const router = express.Router();
const path = require("path")
const mongoose = require('mongoose');
const Project = require('../schema/projects')

const myImgUpload = require('../middleware/upload');

router.use('/myForm', (req, res, next) => {
  console.log(req.body)
  myImgUpload.myImgUploadFunction(req, res);
  next();
});

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

// Lets Use a local Mongo DB
let connString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/?authSource=admin`
// let connString = `mongodb://${DB_HOST}:${DB_PORT}`

console.log(connString)

mongoose.connect(connString, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('projects - Mongoose Connected to Database')

    router.post('/new', async (req, res) => {
      const project = new Project();

      project.tittle = req.body.tittle
      project.description = req.body.description
      project.vigency = req.body.vigency
      project.coordinator = req.body.coordinator
      project.members = req.body.members
      project.scholars = req.body.scholars
      project.status = req.body.status

      project.save(function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send("algo de errado não está certo");
        }
        else {
          res.status(201).send("projeto inserido");
        }
      });
    });

    router.get('/getAll', (req, res) => {
      Project.find((err, data) => {
        if (err) {
          res.status(500).json({ error: "algo de errado não esta certo" })
          console.log(err)
        } else {
          res.status(201).send(data)
        }
      });
    });
  })

  router.delete('/delete', (req, res) => {
    Project.remove({StudentId:188}, 
    (err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });  
});

module.exports = router;
