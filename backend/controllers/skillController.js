const Skill = require('../models/Skill');
const Admin = require('../models/Admin');

const getSkills = async (req, res) => {
  try {
    const category = req.query.category || null;
    const skills = await Skill.findAll(category);
    
    // Handle empty results
    if (!skills || skills.length === 0) {
      return res.json([]);
    }
    
    // Group by category for public API
    if (!req.admin) {
      const grouped = skills.reduce((acc, skill) => {
        if (!skill || !skill.category || !skill.name) return acc;
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
      }, {});
      
      const formatted = Object.entries(grouped).map(([category, skillsList]) => ({
        id: category,
        category,
        skills: skillsList
      }));
      
      return res.json(formatted);
    }
    
    // Return raw data for admin
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    console.error('Error details:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to fetch skills',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;

    if (!name || !category || !level) {
      return res.status(400).json({ error: 'Name, category, and level required' });
    }

    const admin = await Admin.findByEmail(req.admin.email);
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    const skill = await Skill.create({ name, category, level }, admin.id);
    res.status(201).json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level } = req.body;

    if (!id || !name || !category || !level) {
      return res.status(400).json({ error: 'ID, name, category, and level required' });
    }

    const skill = await Skill.update(id, { name, category, level });
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json({ success: true, skill });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ error: 'Failed to update skill' });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Skill ID required' });
    }

    const skill = await Skill.delete(id);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};

