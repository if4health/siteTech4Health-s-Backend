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

    router.post('/new', async (req,res) => {
      // const { 
        tittle,
      //       description,
      //       vigency,
      //       coordinator,
      //       members,
      //       scholars,
      //       status
      //     } = req.body
      

      try {
          const data = Project({status:"statuoso"})
          data.save((err, data) => {
            if(err){
              res.status(500).json({error: "algo de errado não esta certo" })
              console.log(err)
            } else {
              res.status(201).json({message: 'projeto inserida com sucesso' })
            }
            
          })
          
      } catch (error) {
         
      }
    });

    router.get('/getAll', function(req, res) {
      Project.find(function(err, data) {
        if(err){
          res.status(500).json({error: "algo de errado não esta certo" })
          console.log(err)
        } else {
          res.status(201).send(data)
        }
      });  
   });

    
  })

module.exports = router;
