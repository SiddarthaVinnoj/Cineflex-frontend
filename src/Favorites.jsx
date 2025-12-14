import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { getFavorites } from "./utils/favorites";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser && loggedInUser._id) {
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    }
  }, []);

  // ROUTE MAP
  const routeMap = {
    movie: "movies",
    webseries: "webseries",
    kids: "kids",
  };

  // ✅ Only one useEffect
  useEffect(() => {
    if (user) {
      setFavorites(getFavorites(user._id)); // Filter by user if needed
    } else {
      setFavorites([]); // or getFavorites() if global
    }
  }, [user]);

  const filtered =
    filter === "all"
      ? favorites
      : favorites.filter((f) => f.type === filter);

  return (
    <>
      <Navbar />

      <div style={{ marginTop: "80px", padding: "20px" }}>
        <h2>❤️ My Favorites</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="webseries">Webseries</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="card-movies">
        {filtered.length === 0 ? (
          <p style={{ marginLeft: "20px" }}>No favorites found.</p>
        ) : (
          filtered.map((item) => (
            <Link key={item._id} to={`/${routeMap[item.type]}/${item._id}`}>
              <div className="card">
                <img
                  src={item.img || item.image}
                  className="card-img-top"
                  alt={item.name}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}

export default Favorites;
