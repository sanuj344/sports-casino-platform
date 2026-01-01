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




---

## ⚙️ Setup Instructions

### Clone the Repository
```bash
git clone <your-repository-url>
cd sports-casino-platform


Backend Setup
cd sports-casino-backend
npm install


Create .env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://USERNAME:PASSWORD@localhost:5432/sports_casino
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d


Run migrations & seed data
npx prisma migrate dev
npx prisma db seed


Start backend server
node src/server.js
Backend runs on:
http://localhost:3000


Frontend Setup
cd ../sports-casino-frontend
npm install
Create .env
VITE_API_BASE_URL=http://localhost:3000

Start frontend
npm run dev

Frontend runs on:
http://localhost:5173

```
## 🔌 API Endpoints

### 🔐 Authentication
| Method | Endpoint         | Description               |
|-------:|------------------|---------------------------|
| POST   | /auth/register   | Register a new user       |
| POST   | /auth/login      | Login and receive JWT     |

---

### 🎮 Games
| Method | Endpoint                | Description               |
|-------:|-------------------------|---------------------------|
| GET    | /games                  | Get all games             |
| GET    | /games?sport=Cricket    | Filter games by sport     |

---

### ⭐ Favorites
| Method | Endpoint                 | Description                  |
|-------:|--------------------------|------------------------------|
| GET    | /favorites               | Get user's favorite games   |
| POST   | /favorites/:gameId       | Add game to favorites       |
| DELETE | /favorites/:gameId       | Remove game from favorites  |


🔐 Authentication Flow

User logs in and receives a JWT

JWT is stored in localStorage

JWT is sent in Authorization header

Backend validates JWT using middleware

Unauthorized users are redirected to login

📱 UI / UX Highlights

Loading, error, and empty states handled

Mobile-friendly responsive layout

Modern card-based design

Clean navigation with logout support

📌 Author

Sanuj


