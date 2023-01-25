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

const { DB_URI, DB_NAME } = process.env;

let connString = DB_URI;

mongoose.connect(connString, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('projects - Mongoose Connected to Database')


    router.get('/data', (req, res) => {
      Project.find()
        .then(results => {
          res.json(results)
        })
        .catch(error => console.log(error.message))
    })

    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get('/', (req, res) => {
      Project.find()
        .then(results => {
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

      req.body.members = members;
      req.body.scholars = scholars;
      req.body.mypic = req.files.mypic.name;
      
      const project = new Project(req.body)

      project.save()
        .then(results => {
          console.log(project)
          res.redirect('/projects/');
        })
        .catch(error => console.error(error.message))  
    });
    
    router.delete('/delete/:id', (req, res) => {
      Project.deleteOne({ "_id": req.params.id })
        .then(result => {
          console.log(result)
          res.json(result)
        })
        .catch(error => console.error(error))
    })
  });

module.exports = router;
