const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/rbac');

// Mock system metrics (in production, integrate with actual monitoring tools)
router.get('/metrics', isAdmin, (req, res) => {
  // Simulate system metrics
  const metrics = {
    cpu: Math.floor(Math.random() * 30) + 30,
    memory: Math.floor(Math.random() * 40) + 50,
    disk: Math.floor(Math.random() * 50) + 20,
    network: Math.floor(Math.random() * 200) + 50,
    activeUsers: Math.floor(Math.random() * 10) + 20,
    tasksProcessed: Math.floor(Math.random() * 1000) + 500,
    uptime: '99.98%',
    responseTime: Math.floor(Math.random() * 30) + 25
  };

  res.json(metrics);
});

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const { User } = require('../models/User');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const role = req.query.role;

    let query = {};
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
