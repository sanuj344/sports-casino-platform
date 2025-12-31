const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const gamesRoutes = require("./routes/games.routes");
const favoritesRoutes = require("./routes/favorites.routes");




const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// auth routes
app.use("/auth", authRoutes);

app.use("/games", gamesRoutes);
app.use("/favorites", favoritesRoutes);
module.exports = app;
