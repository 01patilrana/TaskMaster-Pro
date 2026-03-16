# TaskMaster Pro API Documentation

## Base URL
```
https://your-api-domain.com/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## User Roles & Permissions

| Role | Permissions |
|------|-------------|
| `user` | Read/write own tasks |
| `manager` | Read/write all tasks, view reports |
| `admin` | Full system access |

---

## Authentication Endpoints

### POST `/auth/register`
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"  // Optional: user, manager, admin
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### POST `/auth/login`
Login existing user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### GET `/auth/me` *(Protected)*
Get current user info

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Task Endpoints

### GET `/tasks` *(Protected)*
Get all tasks (paginated)

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)
- `status` (optional) - Filter by status
- `priority` (optional) - Filter by priority

**Response:**
```json
{
  "tasks": [
    {
      "_id": "task-id",
      "title": "Task Title",
      "description": "Task description",
      "priority": "high",
      "status": "pending",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "userId": "user-id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalTasks": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### POST `/tasks` *(Protected)*
Create a new task

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "status": "pending",
  "dueDate": "2024-12-31"
}
```

**Response:**
```json
{
  "success": true,
  "task": {
    "_id": "new-task-id",
    "title": "New Task",
    "description": "Task description",
    "priority": "medium",
    "status": "pending",
    "dueDate": "2024-12-31T00:00:00.000Z",
    "userId": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PUT `/tasks/:id` *(Protected)*
Update a task

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "task": {
    "_id": "task-id",
    "title": "Updated Task Title",
    "status": "completed",
    // ... other fields
  }
}
```

### DELETE `/tasks/:id` *(Protected)*
Delete a task

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## System Monitoring Endpoints *(Admin Only)*

### GET `/system/metrics` *(Admin Required)*
Get system performance metrics

**Response:**
```json
{
  "cpu": 45.2,
  "memory": 68.1,
  "disk": 32.5,
  "network": 120.4,
  "activeUsers": 24,
  "tasksProcessed": 1247,
  "uptime": "99.98%",
  "responseTime": 42
}
```

### GET `/system/users` *(Admin Required)*
Get all users (paginated)

**Query Parameters:**
- `page`, `limit`, `role`

**Response:**
```json
{
  "users": [
    {
      "_id": "user-id",
      "email": "user@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": {
    "email": "Email is required"
  }
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting
- 100 requests per hour per IP for authenticated users
- 10 requests per hour per IP for unauthenticated users

## CORS
Allowed origins are configured in environment variables.
