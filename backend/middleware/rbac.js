// RBAC Middleware for Express
const jwt = require('jsonwebtoken');

// Roles and Permissions
const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager'
};

const PERMISSIONS = {
  READ_TASKS: 'read:tasks',
  WRITE_TASKS: 'write:tasks',
  DELETE_TASKS: 'delete:tasks',
  MANAGE_USERS: 'manage:users',
  VIEW_REPORTS: 'view:reports',
  SYSTEM_ADMIN: 'system:admin'
};

// Role to Permission mapping
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_TASKS,
    PERMISSIONS.WRITE_TASKS,
    PERMISSIONS.DELETE_TASKS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.SYSTEM_ADMIN
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.READ_TASKS,
    PERMISSIONS.WRITE_TASKS,
    PERMISSIONS.DELETE_TASKS,
    PERMISSIONS.VIEW_REPORTS
  ],
  [ROLES.USER]: [
    PERMISSIONS.READ_TASKS,
    PERMISSIONS.WRITE_TASKS
  ]
};

// JWT verification middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization middleware
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        requiredRoles: roles,
        userRole: req.user.role
      });
    }

    next();
  };
};

// Permission-based authorization middleware
const requirePermission = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    const hasPermission = permissions.every(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        requiredPermissions: permissions,
        userPermissions: userPermissions
      });
    }

    next();
  };
};

// Admin-only middleware
const isAdmin = requireRole(ROLES.ADMIN);

// Manager+ middleware
const isManagerOrAdmin = requireRole(ROLES.MANAGER, ROLES.ADMIN);

module.exports = {
  authenticateToken,
  requireRole,
  requirePermission,
  isAdmin,
  isManagerOrAdmin,
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS
};
