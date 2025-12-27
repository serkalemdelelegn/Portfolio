const About = require('../models/About');
const Admin = require('../models/Admin');

const getAbout = async (req, res) => {
  try {
    const content = await About.getLatest();
    res.json({ content });
  } catch (error) {
    console.error('Error fetching about content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
};

const updateAbout = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content required' });
    }

    // Get admin ID from token
    const admin = await Admin.findByEmail(req.admin.email);
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    await About.create(content, admin.id);
    res.json({ content });
  } catch (error) {
    console.error('Error updating about content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};

module.exports = {
  getAbout,
  updateAbout
};

