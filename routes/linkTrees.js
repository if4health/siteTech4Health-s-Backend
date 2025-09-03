const prepareLinkTree = require("../helpers/prepareLinkTree");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const LinkTree = require("../schema/linkTree.js");

const { DB_URI, DB_NAME, ROOT } = process.env;

let connString = DB_URI;

mongoose
  .connect(connString, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((client) => {
    console.log("linkTrees - Mongoose Connected to Database");

    router.get("/data", (req, res) => {
      LinkTree.find().then((results) => {
        res.json(results);
      });
    });

    router.get("/", (req, res) => {
      if (req.isAuthenticated()) {
        LinkTree.find()
          .then((results) => {
            res.render("linkTrees.ejs", { linkTrees: results });
          })
          .catch((error) => console.error(error.message));
      } else {
        res.redirect(ROOT + "/login");
      }
    });

    router.get("/single/:id", (req, res) => {
      LinkTree.findById(req.params.id)
        .then((results) => {
          res.status(200).json(results);
        })
        .catch((error) => console.error(error.message));
    });

    router.post("/myForm", async (req, res) => {
      if (req.isAuthenticated()) {
        console.log(prepareLinkTree(req.body));
        let corpse = prepareLinkTree(req.body);
        const linkTree = new LinkTree(corpse);
        linkTree
          .save()
          .then((results) => res.redirect(ROOT + "/linkTrees/"))
          .catch((error) => console.error(error.message));
      } else {
        res.redirect(ROOT + "/login");
      }
    });

    router.delete("/delete/:id", (req, res) => {
      if (req.isAuthenticated()) {
        LinkTree.findByIdAndDelete(req.params.id)

          .then(() => {
            res.status(200).send({ message: "LinkTree excluído com sucesso!" });
          })

          .catch((error) => {
            console.error(error);
            res.status(500).send({ message: "Ocorreu um erro ao excluir" });
          });
      } else {
        res.redirect(ROOT + "/login");
      }
    });
  })

  .catch((error) => console.error(error));

module.exports = router;
