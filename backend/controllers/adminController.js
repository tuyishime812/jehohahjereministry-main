const User = require('../models/User');
const ContactForm = require('../models/ContactForm');
const TeamMember = require('../models/TeamMember');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');
const Content = require('../models/Content');

/**
 * Get admin dashboard statistics
 */
const getDashboardStats = async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.countDocuments(),
      totalContactForms: await ContactForm.countDocuments(),
      totalTeamMembers: await TeamMember.countDocuments(),
      totalTestimonials: await Testimonial.countDocuments(),
      totalBlogPosts: await BlogPost.countDocuments(),
      totalContentItems: await Content.countDocuments(),
      pendingContactForms: await ContactForm.countDocuments({ status: 'pending' }),
      recentContactForms: await ContactForm.find().sort({ createdAt: -1 }).limit(5),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update user role
 */
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user: { id: user._id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Toggle user active status
 */
const toggleUserActiveStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User status updated to ${user.isActive ? 'active' : 'inactive'}`,
      user: { id: user._id, username: user.username, isActive: user.isActive }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserActiveStatus
};