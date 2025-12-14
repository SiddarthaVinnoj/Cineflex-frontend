// utils/favorites.js

// Helper function to safely parse JSON from localStorage
const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : {};
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return {};
  }
};

// Helper function to safely stringify JSON and set it in localStorage
const setInStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting JSON in localStorage for key "${key}":`, error);
  }
};

// Get favorites for a specific user
export const getFavorites = (userId) => {
  if (!userId) return []; // no user, no favorites

  const allFavs = getFromStorage("favorites");
  return allFavs[userId] || [];
};

// Add favorite for a specific user
export const addFavorite = (item, type, userId) => {
  if (!userId) return;

  const allFavs = getFromStorage("favorites");
  const userFavs = allFavs[userId] || [];

  const exists = userFavs.find(
    (fav) => fav._id === item._id && fav.type === type
  );

  if (!exists) {
    userFavs.push({ ...item, type });
    allFavs[userId] = userFavs;
    setInStorage("favorites", allFavs);
  }
};

// Remove favorite for a specific user
export const removeFavorite = (id, type, userId) => {
  if (!userId) return;

  const allFavs = getFromStorage("favorites");
  const userFavs = allFavs[userId] || [];

  allFavs[userId] = userFavs.filter((fav) => !(fav._id === id && fav.type === type));
  setInStorage("favorites", allFavs);
};

// Check if an item is favorite for a specific user
export const isFavorite = (id, type, userId) => {
  if (!userId) return false;

  const allFavs = getFromStorage("favorites");
  const userFavs = allFavs[userId] || [];
  return userFavs.some((fav) => fav._id === id && fav.type === type);
};
