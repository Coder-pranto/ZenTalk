const router = require('express').Router();
const { login, logout, signup } = require('../controllers/authController.js');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
