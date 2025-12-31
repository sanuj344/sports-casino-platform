import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/games.css";

const ITEMS_PER_PAGE = 3;

const Games = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sportFilter, setSportFilter] = useState("ALL");
  const [showFavorites, setShowFavorites] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchGames = async () => {
    const url =
      sportFilter === "ALL" ? "/games" : `/games?sport=${sportFilter}`;
    const res = await api.get(url);
    setGames(res.data);
  };

  const fetchFavorites = async () => {
    const res = await api.get("/favorites");
    setFavorites(res.data.map((f) => f.gameId));
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setPage(1);
      await fetchGames();
      await fetchFavorites();
      setLoading(false);
    };
    load();
  }, [sportFilter]);

  const toggleFavorite = async (id) => {
    if (favorites.includes(id)) {
      await api.delete(`/favorites/${id}`);
      setFavorites(favorites.filter((f) => f !== id));
    } else {
      await api.post(`/favorites/${id}`);
      setFavorites([...favorites, id]);
    }
  };

  let filtered = showFavorites
    ? games.filter((g) => favorites.includes(g.id))
    : games;

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter((g) =>
      g.name.toLowerCase().includes(q)
    );
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="games-wrapper">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* HEADER */}
        <div className="games-header">
          <h2>🎮 Games</h2>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="games-card">
          {/* SEARCH */}
          <input
            className="search-box"
            placeholder="Search by team or match name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* FILTERS */}
          <div className="filters">
            {["ALL", "Cricket", "Football", "Tennis"].map((s) => (
              <button
                key={s}
                className={`filter-btn ${
                  sportFilter === s ? "active" : ""
                }`}
                onClick={() => setSportFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* FAVORITES */}
          <button
            className="fav-toggle"
            onClick={() => {
              setShowFavorites(!showFavorites);
              setPage(1);
            }}
          >
            ⭐ Show Favorites
          </button>

          {/* LIST */}
          {visible.map((game) => (
            <div key={game.id} className="game-item">
              <div className="game-left">
                <div className="game-icon">
                  {game.sport === "Cricket"
                    ? "🏏"
                    : game.sport === "Football"
                    ? "⚽"
                    : "🎾"}
                </div>
                <div>
                  <div className="game-title">{game.name}</div>
                  <div className="game-sub">
                    {game.sport} ({game.league})
                  </div>
                </div>
              </div>

              <button
                className={`fav-btn ${
                  favorites.includes(game.id) ? "active" : ""
                }`}
                onClick={() => toggleFavorite(game.id)}
              >
                {favorites.includes(game.id)
                  ? "★ Unfavorite"
                  : "☆ Favorite"}
              </button>
            </div>
          ))}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Games;
