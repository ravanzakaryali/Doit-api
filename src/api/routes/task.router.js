const router = require('express').Router(); 
const taskController = require("../controllers/task.controller");

router.get('/',taskController.getAll);
router.post('/',taskController.create);
router.get('/:id',taskController.getById);

module.exports = router;