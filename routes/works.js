const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const Work = require('../schema/work')

const myPdfUpload = require('../middleware/upload/AWS/S3-bucket-pdf');
const deleteBucketFile = require('../middleware/upload/AWS/S3-Bucket-pdf-delete');

router.use('/myForm', (req, res, next) => {
  console.log(req.body)
  myPdfUpload.myPdfUploadFunction(req, res);
  next();
});

const { DB_URI, DB_NAME, BUCKET_NAME, BUCKET_REGION, ROOT } = process.env;

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
      if (req.isAuthenticated()) {
        Work.find()
        .then(results => {
          res.render('works.ejs', { works: results, url: "https://"+BUCKET_NAME+".s3."+BUCKET_REGION+".amazonaws.com/pdf/" })
        })
        .catch(error => console.error(error.message))
      } else {
        res.redirect(ROOT + '/login');
      }
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
      if (req.isAuthenticated()) {
        function dateFormatParser(data) {
          const dateParts = data.split('-');
          return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
        }
        
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
        
        req.body.coorientadores = coorientadores;
        req.body.authors = authors;
        req.body.mywork = req.files.mywork.name;
        req.body.date = dateFormatParser(req.body.data);
        
        let work = new Work(req.body);
        
        work.save((err, data) => {
          if (err) {
            console.log(err);
          }
        else {
          console.log(work);
          res.redirect('/works');
        }
      });  
    } else {
        res.redirect(ROOT + '/login');
    }
    });

    router.delete('/delete/:id', (req, res) => {
      if (req.isAuthenticated()) {
        Work.findById(req.params.id)
        .then((requisition, response) => {
          const fileName = requisition.mywork;
        
          Work.findByIdAndDelete(req.params.id)
          .then(Work => {
            deleteBucketFile(fileName)
            .then(() => {
                  res.status(200).send({ message: "Publicação excluída com sucesso!" });
                })
                .catch(error => {
                  console.error(error);
                  res.status(500).send({ message: "Ocorreu um erro ao excluir o arquivo PDF do bucket Amazon S3." });
                });
              })
              .catch(error => {
                console.error(error);
              res.status(500).send({ message: "Não foi possível excluir o arquivo com o id " + req.params.id });
            });
        })
        .catch(error => console.error(error));
      } else {
          res.redirect(ROOT + '/login');
      }
      });
  })
  .catch(error => console.error(error));
  
module.exports = router;