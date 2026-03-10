const router = require('express').Router();
const protectRoute  = require('../middlewares/protectRoute');
const { getMessages,sendMessage } = require('../controllers/messageController');


router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, sendMessage);

module.exports = router;