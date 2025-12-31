const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const games = [
    {
      name: "India vs Australia",
      sport: "Cricket",
      league: "International",
      startTime: new Date("2026-01-02T14:00:00Z"),
    },
    {
      name: "Real Madrid vs Barcelona",
      sport: "Football",
      league: "La Liga",
      startTime: new Date("2026-01-03T18:00:00Z"),
    },
    {
      name: "Manchester United vs Chelsea",
      sport: "Football",
      league: "EPL",
      startTime: new Date("2026-01-04T20:00:00Z"),
    },
    {
      name: "Nadal vs Djokovic",
      sport: "Tennis",
      league: "ATP",
      startTime: new Date("2026-01-02T10:00:00Z"),
    },
  ];

  await prisma.game.createMany({
    data: games,
    skipDuplicates: true,
  });

  console.log("✅ Games seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
