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

    router.post('/', async (req,res) => {
      const { name, gender, salary, cell, work } = req.body
  
      const guri = {
          name,
          gender,
          salary,
          cell,
          work
      }
  
      try {
          await Person.create(guri)
          res.status(201).json({message: 'pessoa inserida com sucesso' })
      }  
      catch (error) {
          res.status(500).json({error: "erro encontrado" })
      }
    });
  })

module.exports = router;
