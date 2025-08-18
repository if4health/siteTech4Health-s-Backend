const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Work = require("../schema/work");

const pdfService = require("../services/pdf");

const { DB_URI, DB_NAME, ROOT } = process.env;

// Mongo connection
mongoose
  .connect(DB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((client) => {
    console.log("works - Mongoose Connected to Database");

    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get("/", (req, res) => {
      if (req.isAuthenticated()) {
        Work.find()
          .then((results) => {
            res.render("works.ejs", { works: results, url: "/files/" });
          })
          .catch((error) => console.error(error.message));
      } else {
        res.redirect(ROOT + "/login");
      }
    });

    // @route GET /data
    // @desc Loads JSON for front-end purposes.
    router.get("/data", (req, res) => {
      Work.find()
        .then((results) => {
          res.json(results);
        })
        .catch((error) => console.error(error.message));
    });

    // @route GET /:id
    // @desc Loads form containing only one work.
    router.get("/:id", (req, res) => {
      Work.findById(req.params.id)
        .then((results) => {
          res.render("works.ejs", { works: [results], url: "/files/" });
        })
        .catch((error) => console.error(error.message));
    });

    // @route POST /myForm
    router.post("/myForm", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        const fileName = await pdfService.myPdfUploadFunction(req);
        req.body.mywork = fileName;

        const dateParts = req.body.data.split("-");
        req.body.date = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        req.body.coorientadores = Object.entries(req.body)
          .filter(([k]) => k.startsWith("c"))
          .map(([_, v]) => ({ name: v }));

        req.body.authors = Object.entries(req.body)
          .filter(([k]) => k.startsWith("a"))
          .map(([_, v]) => ({ name: v }));

        const work = new Work(req.body);
        await work.save();

        res.redirect("/works");
      } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
      }
    });

    // @route DELETE /delete/:id
    router.delete("/delete/:id", (req, res) => {
      if (!req.isAuthenticated()) {
        return res.redirect(ROOT + "/login");
      }

      Work.findById(req.params.id)
        .then((requisition) => {
          const fileName = requisition.mywork;

          Work.findByIdAndDelete(req.params.id)
            .then(() => {
              pdfService
                .deleteBucketFile(fileName)
                .then(() => {
                  res
                    .status(200)
                    .send({ message: "Publicação excluída com sucesso!" });
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).send({
                    message:
                      "Ocorreu um erro ao excluir o arquivo PDF do servidor local.",
                  });
                });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send({
                message:
                  "Não foi possível excluir o arquivo com o id " +
                  req.params.id,
              });
            });
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((error) => console.error(error));

module.exports = router;
