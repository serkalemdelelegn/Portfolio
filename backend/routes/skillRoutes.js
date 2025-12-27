const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', skillController.getSkills);

// Protected routes
router.post('/', authMiddleware, skillController.createSkill);
router.put('/:id', authMiddleware, skillController.updateSkill);
router.delete('/:id', authMiddleware, skillController.deleteSkill);

module.exports = router;

