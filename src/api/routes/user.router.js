const userController = require('../controllers/user.controller');
const router = require('express').Router();
const { body } = require('express-validator');


router.get('/', userController.getAll);
router.post('/register', body('email').isEmail(), userController.register),

    module.exports = router;