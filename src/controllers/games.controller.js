const prisma = require("../prismaClient");

exports.getGames = async (req, res) => {
  try {
    const { sport, provider } = req.query;

    const filters = {};

    if (sport) {
      filters.sport = sport;
    }

    if (provider) {
      filters.provider = provider;
    }

    const games = await prisma.game.findMany({
      where: filters,
      orderBy: {
        startTime: "asc",
      },
    });

    return res.status(200).json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch games",
    });
  }
};
