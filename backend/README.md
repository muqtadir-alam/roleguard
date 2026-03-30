# ⚙️ RoleGuard – Backend (API)

## 🌐 Live API

## Admin Credentials (Demo)

Email: muqtadir.alam.dev@gmail.com  
Password: Admin@123

👉 https://roleguard-by2t.vercel.app/

---

## 🧠 Overview

RoleGuard Backend is a secure REST API built with Node.js and Express that provides:

* JWT Authentication
* Role-Based Access Control (User/Admin)
* Task Management (CRUD)
* Scalable and modular architecture

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)
* bcrypt.js (Password hashing)

---

## 🔐 Features

### ✅ Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT token generation

---

### 🛡 Authorization

* Middleware-based route protection
* Role-based access control

User → Manage own tasks
Admin → Full access

---

### 📦 Task Management (CRUD)

* Create Task
* Get Tasks
* Update Task
* Delete Task (Admin only)

---

## ⚙️ Backend Features

* Modular structure (controllers, routes, middleware)
* Custom response handler (sendSuccess, sendError)
* Input validation
* Protected routes
* Clean error handling

---

## 📂 Project Structure

backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
│   └── responseHandler.js
├── config/
└── server.js

---

## 🔑 Environment Variables

Create file:
backend/.env

Add:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000

---

## 🚀 Installation & Setup

git clone https://github.com/muqtadir-alam/roleguard.git
cd roleguard/backend
npm install
npm run dev

---

## 📡 API Endpoints

### 🔐 Authentication

POST /api/v1/auth/register → Register user
POST /api/v1/auth/login → Login user

---

### 📦 Tasks

GET /api/v1/tasks → Get tasks
POST /api/v1/tasks → Create task
PUT /api/v1/tasks/:id → Update task
DELETE /api/v1/tasks/:id → Delete task (Admin only)

---

## 🔐 Security Practices

* Password hashing using bcrypt
* JWT authentication with expiration
* Role-based authorization middleware
* Input validation
* Protected API routes

---

## ⚡ Scalability

* Stateless JWT authentication
* Modular architecture
* MongoDB indexing
* Easy to scale to microservices

---

## 📄 API Documentation

Postman Collection:
https://muqtadir-alam-dev-1813799.postman.co/workspace/f2e8743f-830e-4b79-8252-4db0c051fe3d/collection/50291454-8d76a5f4-700d-4196-880b-a37889e6fed0?action=share&source=copy-link&creator=50291454

---

## 🚀 Deployment

Backend deployed on Vercel

Note:
For production, use:

* Render / Railway (recommended for backend)
* MongoDB Atlas

---

## 👨‍💻 Author

Muqtadir Alam

---

## ⭐ Notes

* Backend follows production-level practices
* Clean and scalable architecture
* Secure authentication and authorization
* Ready for real-world extension
