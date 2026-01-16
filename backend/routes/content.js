const express = require('express');
const Content = require('../models/Content');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get content by page
router.get('/:page', async (req, res) => {
  try {
    const { page } = req.params;

    // Special handling for pages that have dedicated collections
    if (page === 'team') {
      const teamMembers = await TeamMember.find({ isActive: true }).sort({ sortOrder: 1 });
      return res.json([{ page: 'team', section: 'members', content: teamMembers }]);
    }

    if (page === 'testimonials') {
      const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
      return res.json([{ page: 'testimonials', section: 'testimonials', content: testimonials }]);
    }

    if (page === 'blog') {
      const blogPosts = await BlogPost.find({ isPublished: true }).populate('author', 'username').sort({ publishedAt: -1 });
      return res.json([{ page: 'blog', section: 'posts', content: blogPosts }]);
    }

    const content = await Content.find({ page });

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all content
router.get('/', authMiddleware, async (req, res) => {
  try {
    const content = await Content.find().populate('createdBy', 'username').populate('updatedBy', 'username');

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update content
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { page, section, content: contentData } = req.body;

    // Special handling for pages that have dedicated collections
    if (page === 'team' && section === 'members') {
      // Handle team member updates
      // First, clear existing team members
      await TeamMember.deleteMany({});

      // Then add new team members
      for (const member of contentData) {
        const newMember = new TeamMember({
          name: member.name,
          position: member.position,
          bio: member.bio,
          image: member.image
        });
        await newMember.save();
      }

      return res.status(201).json({
        message: 'Team members updated successfully',
        content: contentData
      });
    }

    if (page === 'testimonials' && section === 'testimonials') {
      // Handle testimonials updates
      // First, clear existing testimonials
      await Testimonial.deleteMany({});

      // Then add new testimonials
      for (const testimonial of contentData) {
        const newTestimonial = new Testimonial({
          name: testimonial.name,
          role: testimonial.role,
          content: testimonial.content,
          rating: testimonial.rating,
          isFeatured: testimonial.isFeatured
        });
        await newTestimonial.save();
      }

      return res.status(201).json({
        message: 'Testimonials updated successfully',
        content: contentData
      });
    }

    // Check if content already exists for this page and section
    let content = await Content.findOne({ page, section });

    if (content) {
      // Update existing content
      content.content = contentData;
      content.updatedBy = req.user.userId;
      await content.save();
    } else {
      // Create new content
      content = new Content({
        page,
        section,
        content: contentData,
        createdBy: req.user.userId,
        updatedBy: req.user.userId
      });

      await content.save();
    }

    res.status(201).json({
      message: 'Content saved successfully',
      content
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete content
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all team members
router.get('/team/members', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true }).sort({ sortOrder: 1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add/update team member
router.post('/team/members', authMiddleware, async (req, res) => {
  try {
    const { name, position, bio, image, isActive, sortOrder } = req.body;

    const teamMember = new TeamMember({
      name,
      position,
      bio,
      image,
      isActive,
      sortOrder
    });

    await teamMember.save();

    res.status(201).json({
      message: 'Team member added successfully',
      teamMember
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update team member
router.put('/team/members/:id', authMiddleware, async (req, res) => {
  try {
    const { name, position, bio, image, isActive, sortOrder } = req.body;

    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { name, position, bio, image, isActive, sortOrder },
      { new: true }
    );

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({
      message: 'Team member updated successfully',
      teamMember
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete team member
router.delete('/team/members/:id', authMiddleware, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add testimonial
router.post('/testimonials', authMiddleware, async (req, res) => {
  try {
    const { name, role, content, rating, isFeatured, isActive } = req.body;

    const testimonial = new Testimonial({
      name,
      role,
      content,
      rating,
      isFeatured,
      isActive
    });

    await testimonial.save();

    res.status(201).json({
      message: 'Testimonial added successfully',
      testimonial
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update testimonial
router.put('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const { name, role, content, rating, isFeatured, isActive } = req.body;

    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, content, rating, isFeatured, isActive },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json({
      message: 'Testimonial updated successfully',
      testimonial
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete testimonial
router.delete('/testimonials/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;