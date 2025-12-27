const Contact = require('../models/Contact');

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const contactMessage = await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: 'Message received', data: contactMessage });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const getMessages = async (req, res) => {
  try {
    const unreadOnly = req.query.unread === 'true';
    const messages = await Contact.findAll(unreadOnly);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.markAsRead(id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
};

module.exports = {
  createMessage,
  getMessages,
  markAsRead
};

