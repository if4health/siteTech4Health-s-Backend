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

mongoose.connect(connString, {dbName : DB_NAME, useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log('projects - Mongoose Connected to Database')

    // @route GET /log
    // @desc Loads JSON for front-end purposes.
    router.get('/data', (req, res) => {
      // Projects.find()
      //   .then(results => {
      //     console.log(results)
      //     res.json(results)
      //   })
      //   .catch(error => console.error(error.message))
    })
    // @route GET /:id
    // @desc Loads form containing only one project.
    router.get('/:id', (req, res) => {
      Projects.findById(req.params.id)
        .then(results => {
          console.log(results)
          res.json(results)
        })
        .catch(error => console.error(error.message))
    })

    // @route POST /myForm
    // @desc Send projects data to DB storage.
    router.post('/myForm', (req, res) => {
      req.body.mypic = req.files.mypic.name
      const project = new Project(req.body)
      project.save()
        .then(results => {
          console.log(project)
          res.redirect('/project/');
        })
        .catch(error => console.error(error.message))
    })

    // @route PUT /update/:id
    // @desc Upload a Project status to finish an ongoing Project work.
    router.put('/update/:id', (req, res) => {
      Project.findOneAndUpdate(
        { "_id": req.params.id },
        {
          $set: {
            status: req.body.status
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
          console.log(result)
          res.redirect('/projects/');
        })
        .catch(error => console.error(error.message))
    })

    // @route DELETE /delete/:id
    // @desc Delete a Project by id =) 
    router.delete('/delete/:id', (req, res) => {
      Project.deleteOne({ "_id": req.params.id })
        .then(result => {
          console.log(result)
          res.json(result)
        })
        .catch(error => console.error(error))
    })

  })
  .catch(error => console.error(error))

module.exports = router;
