# 🚀 RoleGuard – Frontend (UI)

## 🌐 Live Demo

## Admin Credentials (Demo)

Email: muqtadir.alam.dev@gmail.com  
Password: Admin@123

👉 https://roleguard-git-main-muqtadiralamdev-5439s-projects.vercel.app/

---

## 🧠 Overview

RoleGuard Frontend is a modern web UI built with Next.js that allows users to:

* Register & Login securely
* Manage tasks (CRUD)
* Experience role-based UI (User/Admin)

It connects to a backend API for authentication and data handling.

---

## 🛠 Tech Stack

* Next.js
* React
* Ant Design
* Axios

---

## 🎨 Features

### 🔐 Authentication UI

* User Registration
* User Login
* JWT token stored in localStorage
* Form validation & error messages

---

### 📊 Dashboard

* View all tasks
* Create new task
* Edit task
* Delete task

---

### 🛡 Role-Based UI

* User → Manage own tasks
* Admin → Delete any task

---

### ⚡ UX Features

* Ant Design UI components
* Success/Error messages
* Loading states
* Protected routes

---

## 📂 Project Structure

frontend/
├── app/
│   ├── page.tsx
│   ├── register/
│   ├── dashboard/
│   ├── layout.tsx
│
├── components/
├── services/
│   └── api.js
│
├── .env.local
└── package.json

---

## 🔑 Environment Variables

Create file:
frontend/.env.local

Add:

NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1

---

## 🔌 API Integration

import axios from "axios";

const API = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_URL
});

export default API;

---

## 🚀 Installation & Setup

git clone https://github.com/muqtadir-alam/roleguard.git
cd roleguard/frontend
npm install
npm run dev

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns token
3. Token stored in localStorage
4. Token sent with requests

Authorization: Bearer <token>

---

## ⚠️ Important Notes

* Use NEXT_PUBLIC_ prefix for env
* Backend must be running
* Use backend URL (not Vercel frontend)

---

## 🚀 Deployment

Frontend deployed on Vercel

Steps:

1. Connect GitHub
2. Set Root Directory → frontend
3. Add environment variable
4. Deploy

---

## 🎯 Future Improvements

* Dark mode
* Pagination
* Better UI/UX
* Global state

---

## 👨‍💻 Author

Muqtadir Alam

---

## ⭐ Notes

* Clean UI + API integration
* Lightweight and scalable
* Ready for production extension
