const prisma = require("../prismaClient");

// Add to favorites
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const gameId = parseInt(req.params.gameId);

    if (!gameId) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    await prisma.favorite.create({
      data: {
        userId,
        gameId,
      },
    });

    return res.status(201).json({
      message: "Game added to favorites",
    });
  } catch (error) {
    // handle duplicate favorite
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Game already in favorites",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Failed to add favorite",
    });
  }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.userId;
    const gameId = parseInt(req.params.gameId);

    await prisma.favorite.deleteMany({
      where: {
        userId,
        gameId,
      },
    });

    return res.status(200).json({
      message: "Game removed from favorites",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to remove favorite",
    });
  }
};

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        game: true,
      },
    });

    return res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch favorites",
    });
  }
};
