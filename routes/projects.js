const prepareBody = require("../helpers/prepareBody.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Project = require("../schema/projects");
const imageService = require("../services/image");

const { DB_URI, DB_NAME, ROOT } = process.env;
const BASE_PATH = process.env.BASE_PATH;

mongoose
  .connect(DB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("projects - Mongoose Connected to Database");

    // @route GET /
    // @desc Loads form and table of projects.
    router.get("/", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        const results = await Project.find();
        res.render("projects.ejs", {
          projects: results,
          url: BASE_PATH ? BASE_PATH + "/images/projects/" : "/images/projects/",
        });
      } catch (err) {
        console.error(err.message);
      }
    });

    // @route GET /data
    // @desc Loads JSON for front-end purposes.
    router.get("/data", async (req, res) => {
      try {
        const results = await Project.find();
        res.json(results);
      } catch (err) {
        console.error(err.message);
      }
    });

    // @route POST /myForm
    // @desc Save project data with uploaded image.
    router.post("/myForm", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        const fileName = await imageService.myImgUploadFunction(
          req,
          "projects"
        );
        let corpse = prepareBody(req.body);
        corpse.mypic = fileName;

        const project = new Project(corpse);
        await project.save();

        res.redirect(ROOT + "/projects/");
      } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
      }
    });

    // @route DELETE /delete/:id
    // @desc Deletes a project and its image.
    router.delete("/delete/:id", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send("Projeto não encontrado");

        const imageName = project.mypic;
        await Project.findByIdAndDelete(req.params.id);
        await imageService.deleteBucketImage(imageName, "projects");

        res.status(200).send({ message: "Projeto excluído com sucesso!" });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          message: "Erro ao excluir o projeto ou a imagem.",
        });
      }
    });
  })
  .catch((err) => console.error(err));

module.exports = router;
