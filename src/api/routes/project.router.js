const router = require('express').Router();
const projectController = require('../controllers/project.controller');

router.get('/', projectController.getAll)
      .get('/last',projectController.getLast)
      .get('/:id',projectController.getById)
      .post('/',projectController.create);

module.exports = router;