const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route
router.get('/', aboutController.getAbout);

// Protected route
router.post('/', authMiddleware, aboutController.updateAbout);

module.exports = router;

