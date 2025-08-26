const { Router } = require("express");

const router = Router();

router.use('/', indexRouter);
router.use('/auth', authGoogle);
router.use('/works', worksRouter);
router.use('/projects', projectsRouter);
router.use('/students', studentsRouter);
router.use('/linkTrees', linkTreesRouter);
router.use('/whiteList', whiteListRouter);
router.use('/healthCheck', healthcheckRouter);
router.use('/login', loginRouter);
router.use('/unauthorized', unauthorizedRouter);