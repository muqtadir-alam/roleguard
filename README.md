# 🚀 RoleGuard - Backend Developer Assignment

A full-stack application demonstrating **secure authentication, role-based access control, and CRUD operations**, built as part of a Backend Developer Internship assignment.

---

# 📌 Live Demo

* 🌐 Frontend: https://roleguard-git-main-muqtadiralamdev-5439s-projects.vercel.app/
* ⚙ Backend API: https://roleguard-by2t.vercel.app/

---

# 🧠 Project Overview

This project implements a **scalable REST API** with:

* JWT Authentication
* Role-Based Access Control (User/Admin)
* CRUD operations (Tasks)
* Secure backend architecture
* Basic frontend UI for interaction

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcrypt.js (Password hashing)

## Frontend

* Next.js (React)
* Ant Design (UI)

## Deployment

* Backend: Vercel
* Frontend: Vercel
* Database: MongoDB Atlas

---

# 🔐 Features

## ✅ Authentication

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based authentication

---

## 🛡 Role-Based Access

* **User**

  * Manage own tasks
* **Admin**

  * View all tasks
  * Delete any task

---

## 📦 Task Management (CRUD)

* Create Task
* Read Tasks
* Update Task
* Delete Task (Admin only)

---

## ⚙ Backend Features

* Modular architecture (controllers, routes, middleware)
* Custom response handler (`sendSuccess`, `sendError`)
* Input validation
* Protected routes using middleware
* Role-based authorization

---

## 🎨 Frontend Features

* Register & Login UI
* Protected Dashboard
* Add / Edit / Delete Tasks
* Role-based UI (Admin controls)
* API integration with Axios
* Success/Error messages

---

# 📂 Project Structure

```bash
roleguard-api/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── pages/
│
├── .gitignore
└── README.md
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

## Frontend (.env)

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/muqtadir-alam/roleguard.git
cd roleguard
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 📡 API Endpoints

## 🔐 Authentication

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register user |
| POST   | /api/v1/auth/login    | Login user    |

---

## 📦 Tasks

| Method | Endpoint       | Access      | 
| ------ | -------------- | ----------- |
| GET    | /api/v1/tasks  | User/Admin  |
| POST   | /api/v1/tasks  | User/Admin  |
| PUT    | /api/v1/tasks/ | Owner/Admin |
| DELETE | /api/v1/tasks/ | Admin only  |

---

# 🔐 Security Practices

* Password hashing using bcrypt
* JWT authentication with expiration
* Role-based authorization middleware
* Input validation
* Protected API routes

---

# 📊 Scalability Approach

* Stateless authentication (JWT) → scalable across servers
* Modular architecture → easy to extend (microservices ready)
* MongoDB indexing for performance
* Future improvements:

  * Redis caching
  * Load balancing (NGINX)
  * Docker containerization

---

# 📄 API Documentation

* Postman Collection (included in repo)
https://muqtadir-alam-dev-1813799.postman.co/workspace/f2e8743f-830e-4b79-8252-4db0c051fe3d/collection/50291454-8d76a5f4-700d-4196-880b-a37889e6fed0?action=share&source=copy-link&creator=50291454

---

# 👨‍💻 Author

**Muqtadir Alam**

---

# 📧 Submission

Submitted as part of Backend Developer Internship assignment.

---

# ⭐ Notes

* This project focuses on backend scalability and security
* Frontend is intentionally minimal for demonstration
* Designed with production-level practices in mind
