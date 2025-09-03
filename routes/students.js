const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Student = require("../schema/student");

const imageService = require("../services/image");

const { DB_URI, DB_NAME, ROOT } = process.env;
const BASE_PATH = process.env.BASE_PATH;

// MongoDB connection
mongoose
  .connect(DB_URI, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("------------------------------------------");
    console.log("students - Mongoose Connected to Database");

    // @route GET /
    // @desc Loads form and table of students.
    router.get("/", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        const results = await Student.find();
        res.render("students.ejs", {
          students: results,
          url: BASE_PATH
            ? BASE_PATH + "/images/students/"
            : "/images/students/",
        });
      } catch (err) {
        console.error(err.message);
      }
    });

    // @route GET /data
    // @desc Loads JSON for front-end purposes.
    router.get("/data", async (req, res) => {
      try {
        const results = await Student.find();
        res.json(results);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error fetching students");
      }
    });

    // @route GET /single/:id
    // @desc Loads form containing only one student.
    router.get("/single/:id", async (req, res) => {
      try {
        const result = await Student.findById(req.params.id);
        res.render("students.ejs", {
          students: [result],
          url: BASE_PATH
            ? BASE_PATH + "/images/students/"
            : "/images/students/",
        });
      } catch (err) {
        console.error(err.message);
      }
    });

    // @route POST /myForm  
    // @desc Send student data to DB storage.
    router.post("/myForm", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        // Upload image and get filename
        const fileName = await imageService.myImgUploadFunction(
          req,
          "students"
        );
        req.body.mypic = fileName;

        const student = new Student(req.body);
        await student.save();

        res.redirect(ROOT + "/students/");
      } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
      }
    });

    // @route PUT /update/:id
    // @desc Updates student status.
    router.put("/update/:id", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        await Student.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { status: req.body.status } },
          { upsert: true }
        );
        res.redirect(ROOT + "/students/");
      } catch (err) {
        console.error(err.message);
      }
    });

    // @route DELETE /delete/:id
    // @desc Deletes a student and their image.
    router.delete("/delete/:id", async (req, res) => {
      if (!req.isAuthenticated()) return res.redirect(ROOT + "/login");

      try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send("Student not found");

        const imageName = student.mypic;

        await Student.findByIdAndDelete(req.params.id);
        await imageService.deleteBucketImage(imageName, "students");

        res.status(200).send({ message: "Estudante excluído com sucesso!" });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          message: "Erro ao excluir o estudante ou a imagem.",
        });
      }
    });
  })
  .catch((err) => console.error(err));

module.exports = router;
