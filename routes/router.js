const { Router } = require("express");

const authGoogle = require('./auth/auth');
const healthcheckRouter = require('./healthCheck');

const indexRouter = require('./index');
const studentsRouter = require('./students');
const worksRouter = require('./works');
const projectsRouter = require('./projects');
const linkTreesRouter = require('./linkTrees');
const whiteListRouter = require('./auth/whitelist');
const unauthorizedRouter = require('./unauthorized');
const loginRouter = require('./login');

const router = Router();

router.use("/", indexRouter);
router.use("/auth", authGoogle);
router.use("/works", worksRouter);
router.use("/projects", projectsRouter);
router.use("/students", studentsRouter);
router.use("/linkTrees", linkTreesRouter);
router.use("/whiteList", whiteListRouter);
router.use("/healthCheck", healthcheckRouter);
router.use("/login", loginRouter);
router.use("/unauthorized", unauthorizedRouter);

module.exports = router;