const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post("/confirmCode",authController.confirmEmail);

module.exports = router;
