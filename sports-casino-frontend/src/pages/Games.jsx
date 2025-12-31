import { useEffect, useState } from "react";
import api from "../api/axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sportFilter, setSportFilter] = useState("ALL");
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch games with sport filter
  const fetchGames = async (sport = "ALL") => {
    try {
      const url =
        sport === "ALL" ? "/games" : `/games?sport=${sport}`;
      const res = await api.get(url);
      setGames(res.data);
    } catch {
      setError("Failed to load games");
    }
  };

  // fetch user's favorites
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
      setLoading(true);
      await fetchGames(sportFilter);
      await fetchFavorites();
      setLoading(false);
    };
    loadData();
  }, [sportFilter]);

  // toggle favorite
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

  // apply favorites filter
  const displayedGames = showFavorites
    ? games.filter((g) => favorites.includes(g.id))
    : games;

  if (loading) return <p>Loading games...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Games</h2>

      {/* SPORT FILTER BUTTONS */}
      <div style={{ marginBottom: 16 }}>
        {["ALL", "Cricket", "Football", "Tennis"].map((sport) => (
          <button
            key={sport}
            onClick={() => setSportFilter(sport)}
            style={{
              marginRight: 8,
              fontWeight: sportFilter === sport ? "bold" : "normal",
            }}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* FAVORITES TOGGLE */}
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "Show All Games" : "Show Favorites"}
      </button>

      {displayedGames.length === 0 && (
        <p style={{ marginTop: 20 }}>No games to show</p>
      )}

      {/* GAMES LIST */}
      <ul style={{ marginTop: 20 }}>
        {displayedGames.map((game) => (
          <li key={game.id} style={{ marginBottom: 12 }}>
            <strong>{game.name}</strong> — {game.sport} ({game.league})
            <button
              style={{ marginLeft: 10 }}
              onClick={() => toggleFavorite(game.id)}
            >
              {favorites.includes(game.id)
                ? "★ Unfavorite"
                : "☆ Favorite"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
