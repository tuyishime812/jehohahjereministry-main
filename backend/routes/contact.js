const express = require('express');
const ContactForm = require('../models/ContactForm');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Contact form submission
router.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new contact form submission
    const contactForm = new ContactForm({
      name,
      email,
      message
    });

    await contactForm.save();

    res.status(200).json({
      message: 'Your message has been received. We will get back to you soon.',
      id: contactForm._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contact form submissions (admin only)
router.get('/submissions', authMiddleware, async (req, res) => {
  try {
    const submissions = await ContactForm.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact form status (admin only)
router.patch('/submissions/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const submission = await ContactForm.findByIdAndUpdate(
      req.params.id,
      { status, respondedBy: req.user.userId },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    res.json({ message: 'Status updated successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;