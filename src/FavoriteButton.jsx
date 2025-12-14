import React, { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "./utils/favorites";

function FavoriteButton({ item, type }) {
  const [favorite, setFavorite] = useState(false);
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

  useEffect(() => {
    if (user) {
      setFavorite(isFavorite(item._id, type, user._id));
    }
  }, [item._id, type, user]);

  const handleClick = () => {
    if (!user) {
      alert("Please login to add to favorites");
      return;
    }

    if (favorite) {
      removeFavorite(item._id, type, user._id);
    } else {
      addFavorite(item, type, user._id);
    }
    setFavorite(!favorite);
  };

  return (
    <button
      className="btn"
      onClick={handleClick}
      style={{ background: "transparent", marginLeft: "10px", fontSize: "30px" }}
    >
      {favorite ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
