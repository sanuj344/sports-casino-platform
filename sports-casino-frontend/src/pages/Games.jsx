import { useEffect, useState } from "react";
import api from "../api/axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGames = async () => {
    try {
      const res = await api.get("/games");
      setGames(res.data);
    } catch {
      setError("Failed to load games");
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await api.get("/favorites");
      setFavorites(res.data.map((f) => f.gameId));
    } catch {
      console.error("Failed to load favorites");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchGames(), fetchFavorites()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleFavorite = async (gameId) => {
    try {
      if (favorites.includes(gameId)) {
        await api.delete(`/favorites/${gameId}`);
        setFavorites(favorites.filter((id) => id !== gameId));
      } else {
        await api.post(`/favorites/${gameId}`);
        setFavorites([...favorites, gameId]);
      }
    } catch {
      alert("Failed to update favorite");
    }
  };

  const displayedGames = showFavorites
    ? games.filter((g) => favorites.includes(g.id))
    : games;

  if (loading) return <p>Loading games...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Games</h2>

      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All Games" : "Show Favorites"}
      </button>

      {displayedGames.length === 0 && <p>No games to show</p>}

      <ul>
        {displayedGames.map((game) => (
          <li key={game.id} style={{ marginBottom: 10 }}>
            <strong>{game.name}</strong> — {game.sport} ({game.league})
            <button
              style={{ marginLeft: 10 }}
              onClick={() => toggleFavorite(game.id)}
            >
              {favorites.includes(game.id) ? "★ Unfavorite" : "☆ Favorite"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
