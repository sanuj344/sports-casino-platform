import { useEffect, useState } from "react";
import api from "../api/axios";

const ITEMS_PER_PAGE = 3; // pagination size

const Games = () => {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sportFilter, setSportFilter] = useState("ALL");
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch games
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

  // Fetch favorites
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
      setError("");
      setCurrentPage(1); // reset page on filter change
      await fetchGames(sportFilter);
      await fetchFavorites();
      setLoading(false);
    };
    loadData();
  }, [sportFilter]);

  // Toggle favorite
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

  // Favorites filter
  let filteredGames = showFavorites
    ? games.filter((g) => favorites.includes(g.id))
    : games;

  // 🔍 Search (match + team names)
  if (search.trim() !== "") {
    const q = search.toLowerCase();
    filteredGames = filteredGames.filter((game) => {
      const name = game.name.toLowerCase();
      const teams = name.split("vs").map((t) => t.trim());
      return (
        name.includes(q) ||
        teams.some((team) => team.includes(q))
      );
    });
  }

  // 📄 Pagination logic
  const totalPages = Math.ceil(
    filteredGames.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGames = filteredGames.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading games...</p>;

  if (error)
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        {error}
      </p>
    );

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 12px" }}>
      <h2>Games</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by team or match name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: 16,
        }}
      />

      {/* SPORT FILTER */}
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {["ALL", "Cricket", "Football", "Tennis"].map((sport) => (
          <button
            key={sport}
            onClick={() => setSportFilter(sport)}
            style={{
              padding: "6px 12px",
              fontWeight: sportFilter === sport ? "bold" : "normal",
            }}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* FAVORITES TOGGLE */}
      <button
        onClick={() => {
          setShowFavorites(!showFavorites);
          setCurrentPage(1);
        }}
        style={{ marginBottom: 20 }}
      >
        {showFavorites ? "Show All Games" : "Show Favorites"}
      </button>

      {/* EMPTY STATE */}
      {paginatedGames.length === 0 && (
        <p style={{ textAlign: "center" }}>No games found</p>
      )}

      {/* GAMES LIST */}
      <ul style={{ padding: 0 }}>
        {paginatedGames.map((game) => (
          <li
            key={game.id}
            style={{
              listStyle: "none",
              borderBottom: "1px solid #ddd",
              marginBottom: 12,
              paddingBottom: 8,
            }}
          >
            <strong>{game.name}</strong> — {game.sport} ({game.league})
            <br />
            <button
              onClick={() => toggleFavorite(game.id)}
              style={{ marginTop: 6 }}
            >
              {favorites.includes(game.id)
                ? "★ Unfavorite"
                : "☆ Favorite"}
            </button>
          </li>
        ))}
      </ul>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 20,
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Games;
