# User Management API (Role-Based + Audit Trail)

## Project Overview

A secure RESTful User Management API built with **Node.js, Express, and MongoDB**.

This project demonstrates:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Admin-only user management
- Audit logging for sensitive actions
- Clean MVC architecture
- Global error handling middleware

---

## Repository

```bash
git clone https://github.com/mfeaya201/Syntecxhub_User_Management_API
cd Syntecxhub_User_Management_API
```

---

# Features

## Authentication

- User signup
- User login
- Password hashing using bcrypt
- JWT-based session handling

## Role-Based Access Control

- Roles: `user`, `admin`
- Admin-only routes protected by middleware
- Role validation layered on top of authentication middleware

## Admin Capabilities

- View all users
- Promote user to admin
- Block users from logging in

## Audit Logging

Sensitive actions are logged automatically:

- `PROMOTE_USER`
- `BLOCK_USER`

Each log stores:

- Action type
- Admin who performed the action
- Target user
- Timestamp

Only admins can view audit logs.

---

# Tech Stack

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **jsonwebtoken**
- **bcryptjs**
- **dotenv**

---

# Project Structure

```
user-management-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── auditController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── auditRoutes.js
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md
```

---

# Setup & Installation

## Install Dependencies

```bash
npm install
```

---

## Create `.env` File

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# API Endpoints

---

## Authentication Routes

### ➤ Register

**POST** `/api/auth/signup`

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

---

### ➤ Login

**POST** `/api/auth/login`

Returns:

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

# Admin Routes (Protected)

All require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### ➤ Get All Users

**GET** `/api/users`

---

### ➤ Promote User

**PUT** `/api/users/:id/promote`

---

### ➤ Block User

**PUT** `/api/users/:id/block`

Blocked users cannot log in.

---

# Audit Log Routes (Admin Only)

### ➤ Get All Logs

**GET** `/api/audit`

Optional query parameters:

```
/api/audit?action=PROMOTE_USER
/api/audit?action=BLOCK_USER
/api/audit?user=<userId>
```

---

# Example curl Test

```bash
curl http://localhost:5000/api/users \
-H "Authorization: Bearer <TOKEN>"
```

---

# Security Highlights

- Passwords hashed with bcrypt
- JWT expires in 1 hour
- Role stored in JWT payload
- Blocked users cannot authenticate
- Sensitive actions automatically logged
- Global error handling middleware

---

# What This Project Demonstrates

- Clean backend architecture
- Middleware layering
- Role-based access control
- Secure authentication practices
- Audit logging implementation
- Production-ready structure

---

# 👩🏽‍💻 Author

**Ayakha Mfengwana**
Backend Development Intern

---
