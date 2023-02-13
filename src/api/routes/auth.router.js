const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post("/confirmCode",authController.confirmEmail);
router.post('/login',authController.login);

module.exports = router;
