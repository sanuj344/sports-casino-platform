const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { getGames } = require("../controllers/games.controller");

router.get("/", authMiddleware, getGames);

module.exports = router;
