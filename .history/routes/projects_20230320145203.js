const prepareBody = require("../helpers/prepareBody.js");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Project = require('../schema/projects')
const myImgUpload = require('../middleware/upload');

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

    // @route POST /
    // @desc insert a new project into the CRUD.
    router.post('/myForm', async (req, res) => {
      let corpse = prepareBody(req.body);
      console.log(corpse)
      corpse.mypic = req.files.mypic.name;
      let project = new Project(corpse);
      project.save()
      
      .then(results => {
          console.log(corpse);
          res.redirect('/projects/');
        })
        .catch(error => console.error(error.message))  
    });
    
    // @route DELETE /
    // @desc delte some CRUD's data.
    router.delete('/delete/:id', (req, res) => {
      Project.deleteOne({ "_id": req.params.id })
        .then(result => {
        // console.log(result)
        res.json(result)
      })
      .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))

module.exports = router;
