const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const objectId = require('mongodb').ObjectID
const path = require("path")
const fileUpload = require('express-fileupload');
const myImgUpload = require('./image-upload');

//make public dir accessible
app.use(express.static('public'))
app.use(express.static('uploads'))

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


//accept JSON data, please
app.use(bodyParser.json())

// Use express-fileupload
app.use(fileUpload());

// server.js
console.log('my first Node App');
console.log('My dir is '+__dirname);

app.listen(3000, function() {
  console.log('listening on 3000')
})

// Lets Use a local Mongo DB
let connectionString = 'mongodb://127.0.0.1:27017'

//callback connection model
// MongoClient.connect(connectionString, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// })

// @route POST /myForm
// @desc Middleware function to handle image upload by using express-fileupload package. Multer is too complicated for this simple application.
 app.use('/myForm', (req, res, next) => {
  myImgUpload.myImgUploadFunction(req, res);
  next();
});

//promises connection model
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('my-first-db')
    const quotesCollection = db.collection('answers')

  // @route POST /myForm
  // @desc Send student data to DB storage.
	app.post('/myForm', (req, res) => {
    req.body.mypic=req.files.mypic.name
	  quotesCollection.insertOne(req.body)
	    .then(result => {
        // console.log(req.body)
	  	  res.redirect('/');
	    })
	    .catch(error => console.error(error))
	})


  // @route GET /:id
  // @desc Loads form containing only one student.
  app.get('/:id', (req, res) => {
    quotesCollection.findOne({"_id":objectId(req.params.id)})
      .then(results => {
        console.log(results)
        res.render('index.ejs', {answers : [results]})
      })
      .catch(error => console.error(error)) 
  })

  // @route GET /
  // @desc Loads form and table of CRUD students.
  app.get('/', (req, res) => {
    quotesCollection.find().toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs', {answers : results})
      })
      .catch(error => console.error(error)) 
  })

  // @route PUT /updateDB
  // @desc Upload a student status to finish an ongoing student work. Search by student name.
	app.put('/updateDB', (req, res) => {
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
			      res.redirect('/');

        	})
        .catch(error => console.error(error))
	})

  // @route DELETE /deleteDB
  // @desc Delete a student. Search by student name. You cannot edit a student. Just insert and delete =) 
	app.delete('/deleteDB', (req, res) => {
 		console.log(req.body.name)
	  quotesCollection.deleteOne(
	    { name: req.body.name }
	  )
	    .then(result => {
	      res.json(`Aluno removido com sucesso`)
	    })
	    .catch(error => console.error(error))
	})
  })
  .catch(error => console.error(error))