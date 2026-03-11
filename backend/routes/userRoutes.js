const router = require('express').Router();
const protectRoute  = require('../middlewares/protectRoute');
const {getUsersForSidebar} = require('../controllers/userController');

router.get('/', protectRoute, getUsersForSidebar);

module.exports = router;