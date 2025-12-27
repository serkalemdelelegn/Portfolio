const Project = require('../models/Project');
const Admin = require('../models/Admin');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    
    // Transform to frontend format
    const formatted = projects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      technologies: Array.isArray(p.technologies) ? p.technologies : [],
      github: p.github_link || undefined,
      demo: p.demo_link || undefined,
      image: p.image_url || undefined
    }));
    
    res.json(formatted);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, technologies, github, demo, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    const admin = await Admin.findByEmail(req.admin.email);
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    const project = await Project.create(
      { title, description, technologies, github, demo, image },
      admin.id
    );

    res.status(201).json({
      id: project.id,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      github: project.github_link || '',
      demo: project.demo_link || '',
      image: project.image_url || ''
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, technologies, github, demo, image } = req.body;

    if (!id || !title || !description) {
      return res.status(400).json({ error: 'ID, title and description required' });
    }

    const project = await Project.update(id, {
      title,
      description,
      technologies,
      github,
      demo,
      image
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ success: true, project });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Project ID required' });
    }

    const project = await Project.delete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};

