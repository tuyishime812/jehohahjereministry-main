const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserActiveStatus
} = require('../controllers/adminController');

const router = express.Router();

// Get admin dashboard statistics
router.get('/dashboard-stats', authMiddleware, getDashboardStats);

// Get all users
router.get('/users', authMiddleware, getAllUsers);

// Update user role
router.patch('/users/:userId/role', authMiddleware, updateUserRole);

// Toggle user active status
router.patch('/users/:userId/toggle-status', authMiddleware, toggleUserActiveStatus);

module.exports = router;