const express = require('express');
const router = express.Router();
const path = require("path")
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose')
const Student = require('../schema/student')

const myImgUpload = require('../middleware/upload');

router.use('/myForm', (req, res, next) => {
  console.log(req.body)
  myImgUpload.myImgUploadFunction(req, res);
  next();
});
 
const { DB_URI, DB_NAME } = process.env;

let connString = DB_URI;

mongoose.connect(connString, {dbName : DB_NAME, useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log('students - Mongoose Connected to Database')

    // @route GET /log
    // @desc Loads JSON for front-end purposes.
    router.get('/data', (req, res) => {
      Student.find()
        .then(results => {
          res.json(results)
        })
        .catch(error => console.error(error.message))
    })

    // @route GET /
    // @desc Loads form and table of students.
    router.get('/', (req, res) => {
      Student.find()
        .then(results => {
          res.render('students.ejs', { students: results })
        })
        .catch(error => console.error(error.message))
    })

    // @route GET /:id
    // @desc Loads form containing only one student.
    router.get('/single/:id', (req, res) => {
      Student.findById(req.params.id)
        .then(results => {
          // console.log(results)
          res.render('students.ejs', { students: [results] })
        })
        .catch(error => console.error(error.message))
    })

    // @route POST /myForm
    // @desc Send student data to DB storage.
    router.post('/myForm', (req, res) => {
      req.body.mypic = req.files.mypic.name
      const student = new Student(req.body)
      student.save()
        .then(results => {
          console.log(student)
          res.redirect('/students/');
        })
        .catch(error => console.error(error.message))
    })

    // @route PUT /update/:id
    // @desc Upload a student status to finish an ongoing student work.
    router.put('/update/:id', (req, res) => {
      Student.findOneAndUpdate(
        { "_id": req.params.id },
        {
          $set: {
            status: req.body.status,
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
          console.log(result)
          res.redirect('/students/');
        })
        .catch(error => console.error(error.message))
    })

    // @route DELETE /delete/:id
    // @desc Delete a student by id =) 
    router.delete('/delete/:id', (req, res) => {
      Student.deleteOne({ "_id": req.params.id })
        .then(result => {
          console.log(result)
          res.json(result)
        })
        .catch(error => console.error(error))
    })

  })
  .catch(error => console.error(error))

module.exports = router;
