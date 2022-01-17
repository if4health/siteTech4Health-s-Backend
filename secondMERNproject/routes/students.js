const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID
const path = require("path")
const fileUpload = require('express-fileupload');

const myImgUpload = require('../middleware/upload');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   // res.send('Let`s use my firs App here');
//   res.render('students', { title: 'TESTE' });
// });

router.use('/myForm', (req, res, next) => {
  console.log(req.body)
  myImgUpload.myImgUploadFunction(req, res);
  next();
});

// Lets Use a local Mongo DB
let connectionString = 'mongodb://127.0.0.1:27017'

// router.post('/ping', (req,res) => {
//     console.log(req.body);
//     res.send('ok ' + req.body.test);
// });

//promises connection model
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('my-first-db')
    const quotesCollection = db.collection('answers')

  // @route POST /myForm
  // @desc Send student data to DB storage.
  router.post('/myForm', (req, res) => {
    req.body.mypic=req.files.mypic.name
    quotesCollection.insertOne(req.body)
      .then(result => {
        // console.log(req.body)
        res.redirect('/students/');
      })
      .catch(error => console.error(error))
  })


  // @route GET /:id
  // @desc Loads form containing only one student.
  router.get('/:id', (req, res) => {
    quotesCollection.findOne({"_id":objectId(req.params.id)})
      .then(results => {
        console.log(results)
        res.render('students.ejs', {answers : [results]})
      })
      .catch(error => console.error(error)) 
  })

  // @route GET /
  // @desc Loads form and table of students.
  router.get('/', (req, res) => {
    quotesCollection.find().toArray()
      .then(results => {
        // console.log(results)
        res.render('students.ejs', {answers : results})
      })
      .catch(error => console.error(error)) 
  })

  // @route PUT /updateDB
  // @desc Upload a student status to finish an ongoing student work. Search by student name.
  router.put('/updateDB', (req, res) => {
    quotesCollection.findOneAndUpdate(
        { name: req.body.name },
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
            res.redirect('/students/');
          })
        .catch(error => console.error(error))
  })

  // @route PUT /update/:id
  // @desc Upload a student status to finish an ongoing student work.
  router.put('/update/:id', (req, res) => {
    quotesCollection.findOneAndUpdate(
        {"_id":objectId(req.params.id)},
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
            res.redirect('/students/');
          })
        .catch(error => console.error(error))
  })

  // @route DELETE /delete/:id
  // @desc Delete a student by id =) 
  router.delete('/delete/:id', (req, res) => {
    quotesCollection.deleteOne({"_id":objectId(req.params.id)})
      .then(result => {
        console.log(result)
        res.json(result)
      })
      .catch(error => console.error(error))
  })

  // @route DELETE /deleteDB
  // @desc Delete a published work. Search by work name. You cannot edit a work. Just insert and delete =) 
  router.delete('/deleteDB', (req, res) => {
    console.log(req.body.periodico)
    quotesCollection.deleteOne(
      { name: req.body.periodico }
    )
      .then(result => {
        res.json(`Publicacao removida com sucesso`)
      })
      .catch(error => console.error(error))
  })

  })
  .catch(error => console.error(error))


module.exports = router;
