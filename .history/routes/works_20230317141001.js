const express = require('express');
const router = express.Router();
const path = require("path")

const mongoose = require('mongoose')
const Work = require('../schema/work')

const myPdfUpload = require('../middleware/upload');

router.use('/myForm', (req, res, next) => {
  console.log(req.body)
  myPdfUpload.myPdfUploadFunction(req, res);
  next();
});

const { DB_URI, DB_NAME } = process.env;

// Lets Use a local Mongo DB
let connString = DB_URI;
// let connString = `mongodb://${DB_HOST}:${DB_PORT}`
// console.log(connString)

mongoose.connect(connString, {dbName : DB_NAME, useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log('works - Mongoose Connected to Database')
  
    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get('/', (req, res) => {
      Work.find()
        .then(results => {
          res.render('works.ejs', { works: results })
        })
        .catch(error => console.error(error.message))
    })
  
    // @route GET /log
    // @desc Loads JSON for front-end purposes.
    router.get('/data', (req, res) => {
      Work.find()
        .then(results => {
           res.json(results)
          })
        .catch(error => console.error(error.message))
    })
  
    // @route GET /:id
    // @desc Loads form containing only one work.
    router.get('/:id', (req, res) => {
      Work.findById(req.params.id)
        .then(results => {
          // console.log(results)
          res.render('works.ejs', { works: [results] })
        })
        .catch(error => console.error(error.message))
    })
  
    router.post('/myForm', async (req, res) => {
      const date = new Date(req.body.data);
      let bodyKeys = [];
      let bodyValues = [];
      let coorientadores = [];
      let authors = [];
  
      ///
      for(let i in req.body){
        bodyKeys.push(i);
        bodyValues.push(req.body[i])
      }
      ///
    
      bodyKeys.forEach((e) => {
        if(e.charAt(0) == 'c'){
          coorientadores.push(
            {
              "name" :  bodyValues[bodyKeys.indexOf(e)]
            }
          )
        }
      })
    
      bodyKeys.forEach((e) => {
        if(e.charAt(0) == 'a'){
          authors.push(
            {
              "name" :  bodyValues[bodyKeys.indexOf(e)]
            }
          )
        }
      })
    
      // console.log(authors);

      req.body.coorientadores = coorientadores;
      req.body.authors = authors;
      req.body.mywork = req.files.mywork.name;
      req.body.day = date.getDate();
      req.body.month = date.getUTCMonth();
      req.body.year = date.getUTCFullYear();

      let work = new Work(req.body);

      // console.log(work)
      // console.log(req.body)

      work.save((err, data) => {
        if (err) {
          // console.log(err);
        }
        else {
          // console.log(work);
          res.redirect('/works/');
        }
      });  
    });

  router.delete('/delete/:id', (req, res) => {
    Work.deleteOne({ "_id": req.params.id })
      .then(result => {
        // console.log(result)
        res.json(result)
      })
      .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))


// //promises connection model
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('my-first-db')
//     const quotesCollection = db.collection('works')

//   // // @route GET /:id
//   // // @desc Loads form containing only one work.
//   // router.get('/:id', (req, res) => {
//   //   quotesCollection.findOne({"_id":objectId(req.params.id)})
//   //     .then(results => {
//   //       console.log(results)
//   //       res.render('works.ejs', {works : [results]})
//   //     })
//   //     .catch(error => console.error(error)) 
//   // })

//   // // @route GET /
//   // // @desc Loads form and table of CRUD works.
//   // router.get('/', (req, res) => {
//   //   quotesCollection.find().toArray()
//   //     .then(results => {
//   //       console.log(results)
//   //       res.render('works.ejs', {works : results})
//   //     })
//   //     .catch(error => console.error(error)) 
//   // })

//   // @route DELETE /delete/:id
//   // @desc Delete a published work by id. 
//   router.delete('/delete/:id', (req, res) => {
//     quotesCollection.deleteOne({"_id":objectId(req.params.id)})
//       .then(result => {
//         console.log(result)
//         res.json(result)
//       })
//       .catch(error => console.error(error))
//   })

//   })
//   .catch(error => console.error(error))


module.exports = router;