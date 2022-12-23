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

mongoose.connect(connString, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('projects - Mongoose Connected to Database')

    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get('/', (req, res) => {
      Project.find()
        .then(results => {
          // console.log(results)
          res.render('projects.ejs', { projects: results })
        })
        .catch(error => console.error(error.message))
    })

    router.post('/new', async (req, res) => {
      const project = new Project(req.body)

      // if(req.body.member2){ project.members.push(req.body.member2); }
      // if(req.body.member3){ project.members.push(req.body.member3); }
      // if(req.body.member4){ project.members.push(req.body.member4); }
      // if(req.body.member5){ project.members.push(req.body.member5); }
      // if(req.body.member6){ project.members.push(req.body.member6); }
      // if(req.body.member7){ project.members.push(req.body.member7); }
      // if(req.body.member8){ project.members.push(req.body.member8); }
      // if(req.body.member9){ project.members.push(req.body.member9); }
      // if(req.body.member10){ project.members.push(req.body.member10); }

      // if(req.body.scholars2){ project.members.push(req.body.scholars2); }
      // if(req.body.scholars3){ project.members.push(req.body.scholars3); }
      // if(req.body.scholars4){ project.members.push(req.body.scholars4); }
      // if(req.body.scholars5){ project.members.push(req.body.scholars5); }
      // if(req.body.scholars6){ project.members.push(req.body.scholars6); }
      // if(req.body.scholars7){ project.members.push(req.body.scholars7); }
      // if(req.body.scholars8){ project.members.push(req.body.scholars8); }
      // if(req.body.scholars9){ project.members.push(req.body.scholars9); }
      // if(req.body.scholars10){ project.members.push(req.body.scholars10); }

      project.save((err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send({"error":"algo de errado não está certo"});
        }
        else {
          res.status(201).send({"message":"projeto inserido!"});
        }
      });  
    });

    router.get('/getAll', (req, res) => {
      Project.find((err, data) => {
          err
          ? res.status(500).json(err)
          : res.status(201).send(data)
      });
    });
    
    router.delete('/one', (req, res) => {
      Project.remove(req.body, (err, data) => {
          err 
          ? console.log(err) 
          : res.status(200).send({"message":"projeto deletado"});
      });  
    });

    router.delete('/all', (req, res) => {
      Project.find((err, data) => {
        data == []
        ? Project.collection.drop((err) => {
          err
          ? console.log(err)
          : res.status(200).send({"message":"todos projetos deletados"});
        })
        :res.status(200).send({"message":"todos osprojetos deletados"});
    });

      
    })

  })


module.exports = router;
