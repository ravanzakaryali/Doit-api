const userController = require('../controllers/user.controller');

const router = require('express').Router();


router.get('/',userController.getAll);
router.post('/register',userController.register),

module.exports = router;