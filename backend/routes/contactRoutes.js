const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route
router.post('/', contactController.createMessage);

// Protected routes
router.get('/', authMiddleware, contactController.getMessages);
router.patch('/:id/read', authMiddleware, contactController.markAsRead);

module.exports = router;

