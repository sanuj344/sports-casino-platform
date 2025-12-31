const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favorites.controller");

router.post("/:gameId", authMiddleware, addFavorite);
router.delete("/:gameId", authMiddleware, removeFavorite);
router.get("/", authMiddleware, getFavorites);

module.exports = router;
