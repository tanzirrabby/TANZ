# Tanz — Fashion E-Commerce

A full-stack fashion e-commerce app built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd backend
cp ../.env.example .env
# Edit .env and set your MONGO_URI and JWT_SECRET
```

### 2. Install & Run Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Seed the Database (optional but recommended)

```bash
cd backend
npm run seed
# Creates sample products + admin user: admin@tanz.com / admin123
```

### 4. Install & Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 🗂 Project Structure

- **frontend/** — React + Vite + Tailwind CSS + Zustand
- **backend/** — Node.js + Express + MongoDB (Mongoose)

## 📦 Features

- Browse & search products
- Product detail pages
- Shopping cart (persistent with Zustand)
- Sliding cart sidebar
- User authentication (register/login)
- Order placement & history
- Admin dashboard (products & orders CRUD)
- Custom cursor
- Responsive design

## 🔐 Admin Access

After seeding, login with:
- **Email:** admin@tanz.com
- **Password:** admin123

## 🛠 Tech Stack

| Layer      | Tech                          |
|------------|-------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS  |
| State      | Zustand                       |
| HTTP       | Axios                         |
| Backend    | Node.js, Express              |
| Database   | MongoDB, Mongoose             |
| Auth       | JWT, bcryptjs                 |
