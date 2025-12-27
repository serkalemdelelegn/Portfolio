const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', experienceController.getExperiences);

// Protected routes
router.post('/', authMiddleware, experienceController.createExperience);
router.put('/:id', authMiddleware, experienceController.updateExperience);
router.delete('/:id', authMiddleware, experienceController.deleteExperience);

module.exports = router;

