
import React, { useEffect, useState, useContext } from "react";
import ApartmentCard from "./ApartmentCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/App.css";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function Favorites() {
  const { token, user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!token || !user || user.isBusiness || user.isAdmin) return;

    fetch(`${API_BASE}/users/favorites`, {
      headers: { "x-auth-token": token }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch favorites");
        return res.json();
      })
      .then(data => {
        const mapped = data.map(c => ({
          id:       c._id,
          title:    c.title,
          location: c.location,
          price:    c.price,
          date:     new Date(c.createdAt).toISOString().split("T")[0],
          image:    c.image.url
        }));
        setFavorites(mapped);
      })
      .catch(err => {
        console.error(err);
      });
  }, [token, user]);

  return (
  <div className="favorites-container">
    <h2>My Favorite Apartments</h2>
    {favorites.length === 0 ? (
      <p className="no-favorites">No favorites yet.</p>
    ) : (
      <div className="favorites-grid">
        {favorites.map((apt, idx) => (
          <ApartmentCard key={apt.id || idx} {...apt} />
        ))}
      </div>
    )}
  </div>
);
}
