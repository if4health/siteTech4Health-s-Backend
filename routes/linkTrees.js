const prepareLinkTree = require("../helpers/prepareLinkTree");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const LinkTree = require('../schema/linkTree.js')

<<<<<<< HEAD
const { DB_URI, DB_NAME, ROOT } = process.env;
=======
const { DB_URI, DB_NAME } = process.env;

>>>>>>> bdc0d032c4377cbf7b4f0a5ffeb857de3690405a
let connString = DB_URI;

mongoose.connect(connString, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('linkTrees - Mongoose Connected to Database')
<<<<<<< HEAD
=======
        console.log('------------------------------------------')
>>>>>>> bdc0d032c4377cbf7b4f0a5ffeb857de3690405a

        router.get('/data', (req, res) => {
          LinkTree.find()
          .then(results => {
            res.json(results)
          })
<<<<<<< HEAD
        })

        router.get('/', (req, res) => {
          if (req.isAuthenticated()) {
            LinkTree.find()
            .then(results => {
              res.render('linkTrees.ejs', { linkTrees: results })
            })
            .catch(error => console.error(error.message))
          } else {
            res.redirect(ROOT + '/login');
          }
        })

        router.get('/single/:id', (req, res) => {
          if (req.isAuthenticated()) {
            LinkTree.findById(req.params.id)
            .then(results => {
              res.status(200).json(results);
            })
            .catch(error => console.error(error.message))
          } else {
              res.redirect(ROOT + '/login');
          }
        })
        
        router.post('/myForm', async (req, res) => {
          if (req.isAuthenticated()) {
            console.log(prepareLinkTree(req.body))
            let corpse = prepareLinkTree(req.body);
            const linkTree = new LinkTree(corpse);
            linkTree
            .save()
            .then(results => res.redirect('/linkTrees/'))
            .catch(error => console.error(error.message));
          } else {
              res.redirect(ROOT + '/login');
          }
          });
          
          router.delete('/delete/:id', (req, res) => {
            if (req.isAuthenticated()) {
              LinkTree
              .findByIdAndDelete(req.params.id)
              
              .then(() => {
                res.status(200).send({ message: "LinkTree excluído com sucesso!" });
              })
              
              .catch(error => {
                console.error(error);
                res.status(500).send({ message: "Ocorreu um erro ao excluir" });
              });
            } else {
                res.redirect(ROOT + '/login');
            }
=======
          // .catch(error => console.log(error.message))
        })

        // @route GET /
        // @desc Loads form and table of CRUD works.
        router.get('/', (req, res) => {
          LinkTree.find()
          .then(results => {
            res.render('linkTrees.ejs', { linkTrees: results })
          })
          .catch(error => console.error(error.message))
        })

        router.get('/single/:id', (req, res) => {
          LinkTree.findById(req.params.id)
          .then(results => {
            res.status(200).json(results);
          })
          .catch(error => console.error(error.message))
        })
        
        // @route POST /
        // @desc insert a new project into the CRUD.
        router.post('/myForm', async (req, res) => {
          console.log(prepareLinkTree(req.body))
          let corpse = prepareLinkTree(req.body);
          const linkTree = new LinkTree(corpse);
          linkTree
            .save()
            .then(results => res.redirect('/linkTrees/'))
            .catch(error => console.error(error.message));
        });

        router.delete('/delete/:id', (req, res) => {
          LinkTree
              .findByIdAndDelete(req.params.id)

              .then(() => {
                res.status(200).send({ message: "LinkTree excluído com sucesso!" });
              })

              .catch(error => {
                console.error(error);
                  res.status(500).send({ message: "Ocorreu um erro ao excluir" });
              });
>>>>>>> bdc0d032c4377cbf7b4f0a5ffeb857de3690405a
	      });
    })

    .catch(error => console.error(error))

module.exports = router;
