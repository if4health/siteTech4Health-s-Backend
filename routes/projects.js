const prepareBody = require("../helpers/prepareBody.js");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Project = require('../schema/projects')
const myImgUpload = require('../middleware/upload/AWS/S3-Bucket-image');
const deleteBucketImage = require('../middleware/upload/AWS/S3-Bucket-image-delete');

router.use('/myForm', (req, res, next) => {
  myImgUpload.myImgUploadFunction(req, res, "projects");
  next();
});

const { DB_URI, DB_NAME, BUCKET_NAME, BUCKET_REGION } = process.env;

let connString = DB_URI;

mongoose.connect(connString, { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('projects - Mongoose Connected to Database')

    router.get('/data', (req, res) => {
      Project.find()
      .then(results => {
        res.json(results)
      })
      .catch(error => console.log(error.message))
    })
    
    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get('/', (req, res) => {
      Project.find()
      .then(results => {
        res.render('projects.ejs', { projects: results, url: "https://"+BUCKET_NAME+".s3."+BUCKET_REGION+".amazonaws.com/img/projects/" })
        console.log(results)
      })
      .catch(error => console.error(error.message))
    })

    // @route POST /
    // @desc insert a new project into the CRUD.
    router.post('/myForm', async (req, res) => {
      let corpse = prepareBody(req.body);
      corpse.mypic = req.files.mypic.name;
      let project = new Project(corpse);
      project
        .save()
        .then(results => res.redirect('/projects/'))
        .catch(error => console.error(error.message));
    });

    router.delete('/delete/:id', (req, res) => {
			Project.findById(req.params.id)
				.then((requisition, response) => {
					const imageName = requisition.mypic;
					Project.findByIdAndDelete(req.params.id)
						.then(project => {
							deleteBucketImage(imageName, "projects")

							.then(() => {
								res.status(200).send({ message: "Projeto excluído com sucesso!" });
							})

							.catch(error => {
								console.error(error);
								res.status(500).send({ message: "Ocorreu um erro ao excluir a imagem do bucket da Amazon S3." });
							});
						})
						.catch(error => {
							console.error(error);
							res.status(500).send({ message: "Não foi possível excluir um projeto com o id " + req.params.id });
						});

					})
					.catch(error => console.error(error))
			});
  })
  .catch(error => console.error(error))

module.exports = router;
