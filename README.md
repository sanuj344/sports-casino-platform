# 🏏 Sports / Casino Mini Platform

A full-stack mini platform simulating core features of sports betting / casino applications (without real money or betting logic).  
Users can register, log in, browse games, filter them, search by teams, and mark favorites.

---

## 🚀 Features

### Core Features
- User registration & login with JWT authentication
- Secure password hashing using bcrypt
- Protected routes (only authenticated users can access games)
- List of sports matches
- Filter games by sport
- Mark / unmark games as favorites (persisted in database)
- View favorite games
- Logout functionality

### Optional / Bonus Features
- Search games by team or match name
- Pagination for games list
- Clean, responsive UI
- Pixel-perfect modern UI design
- Deployment-ready setup

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Custom CSS (responsive & modern UI)

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## 📁 Project Structure

<pre>
sports-casino-platform/
|-- sports-casino-backend/
|   |-- src/
|   |   |-- controllers/
|   |   |   |-- auth.controller.js
|   |   |   |-- games.controller.js
|   |   |   `-- favorites.controller.js
|   |   |-- routes/
|   |   |   |-- auth.routes.js
|   |   |   |-- games.routes.js
|   |   |   `-- favorites.routes.js
|   |   |-- middleware/
|   |   |   `-- auth.middleware.js
|   |   |-- prismaClient.js
|   |   |-- app.js
|   |   `-- server.js
|   |-- prisma/
|   |   |-- schema.prisma
|   |   `-- seed.js
|   |-- .env.example
|   `-- package.json
|
|-- sports-casino-frontend/
|   |-- src/
|   |   |-- pages/
|   |   |   |-- Login.jsx
|   |   |   |-- Register.jsx
|   |   |   `-- Games.jsx
|   |   |-- styles/
|   |   |   |-- auth.css
|   |   |   `-- games.css
|   |   |-- routes/
|   |   |   `-- ProtectedRoute.jsx
|   |   |-- api/
|   |   |   `-- axios.js
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- .env.example
|   `-- package.json
|
`-- README.md
</pre>

