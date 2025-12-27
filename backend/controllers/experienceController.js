const Experience = require('../models/Experience');
const Admin = require('../models/Admin');

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    
    // Transform to frontend format
    const formatted = experiences.map(exp => {
      const dateParts = exp.date_range.split(' - ');
      return {
        id: exp.id,
        position: exp.title,
        company: exp.company,
        startDate: dateParts[0] || exp.date_range,
        endDate: dateParts[1] || '',
        description: exp.description,
        technologies: [] // Can be extended
      };
    });
    
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};

const createExperience = async (req, res) => {
  try {
    const { title, company, date, description, type } = req.body;

    if (!title || !company || !date) {
      return res.status(400).json({ error: 'Title, company, and date required' });
    }

    const admin = await Admin.findByEmail(req.admin.email);
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    const experience = await Experience.create(
      { title, company, date, description, type },
      admin.id
    );

    res.status(201).json({
      id: experience.id,
      title: experience.title,
      company: experience.company,
      date: experience.date_range,
      description: experience.description
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    res.status(500).json({ error: 'Failed to create experience' });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, date, description, type } = req.body;

    if (!id || !title || !company || !date) {
      return res.status(400).json({ error: 'ID, title, company, and date required' });
    }

    const experience = await Experience.update(id, {
      title,
      company,
      date,
      description,
      type
    });

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json({ success: true, experience });
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Failed to update experience' });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Experience ID required' });
    }

    const experience = await Experience.delete(id);
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
};

