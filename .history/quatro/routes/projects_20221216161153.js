const express = require('express');
const router = express.Router();
const path = require("path")

const mongoose = require('mongoose');
const Project = require('../schema/projects')

const myImgUpload = require('../middleware/upload');
const { json } = require('body-parser');

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

    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get('/', (req, res) => {
      Project.find()
        .then(results => {
          // console.log(results)
          res.render('projects.ejs', { projects: results })
        })
        .catch(error => console.error(error.message))
    })

    router.post('/myForm', async (req, res) => {
      let bodyKeys = [];
      let bodyValues = [];
      let members = [];
      let scholars = [];

      ///
      for(let i in req.body){
        bodyKeys.push(i);
        bodyValues.push(req.body[i])
      }
      ///

      bodyKeys.forEach((e) => {
        if(e.charAt(1) == 'e'){
          members.push(
            {
              "name" :  bodyValues[bodyKeys.indexOf(e)]
            }
          )
        }
      })

      bodyKeys.forEach((e) => {
        if(e.charAt(1) == 'c'){
          scholars.push(
            {
              "name" :  bodyValues[bodyKeys.indexOf(e)]
            }
          )
        }
      })

      // console.log(authors);

      req.body. = ;
      req.body.authors = authors;
      req.body.mywork = req.files.mywork.name;
      req.body.day = date.getUTCDay();
      req.body.month = date.getUTCMonth();
      req.body.year = date.getUTCFullYear();
      
      const project = new Project(req.body)

      console.log(project)
      project.save((err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send({"error":"algo de errado não está certo"});
        }
        else {
          res.status(201).send({"message":"projeto inserido!"});
        }
      });  
    });

    router.get('/getAll', (req, res) => {
      Project.find((err, data) => {
          err
          ? res.status(500).json(err)
          : res.status(201).send(data)
      });
    });
    
    router.delete('/one', (req, res) => {
      Project.remove(req.body, (err, data) => {
          err 
          ? console.log(err) 
          : res.status(200).send({"message":"projeto deletado"});
      });  
    });

    router.delete('/all', (req, res) => {
      // Project.find((err, data) => {
      //   data != JSON.parse("[]") ?
        Project.collection.drop((err) => {
          err
          ? console.log(err)
          : res.status(200).send({"message":"todos os projetos foram deletados"});
        })
    //     : res.status(200).send({"message":"todos os projetos já estavam deletados"});
    //   });
    });
  });

module.exports = router;
