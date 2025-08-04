
import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import "../styles/ApartmentCard.css";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function ApartmentCard({ id, title, location, price, date, image }) {
  const { token, user } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
  console.log("🧪 useEffect - user:", user);
  console.log("🧪 useEffect - token:", token);

  if (!token || !user || user.isBusiness || user.isAdmin) return;

  fetch(`${API_BASE}/users/favorites`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token
  }
})

    .then(async res => {
      if (!res.ok) {
        const text = await res.text();
        console.error("Favorites request failed:", text);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setIsFavorited(data.some(card => card._id === id));
      }
    })
    .catch(console.error);
}, [id, token, user]);


  const handleClick = async () => {
    try {
      const res = await fetch(`${API_BASE}/cards/${id}`, {
        headers: token ? { "x-auth-token": token } : {}
      });
      if (!res.ok) throw new Error(res.statusText);
      const card = await res.json();

      const ownerContact = user && !user.isBusiness
        ? `<p><strong>Owner phone:</strong> ${card.ownerId?.phone || "N/A"}</p>`
        : "";

      Swal.fire({
        title: card.title,
        html: `
          <img src="${card.image.url}" alt="${card.image.alt}" style="width:100%;border-radius:4px;margin-bottom:1em;" />
          <p><strong>Description:</strong> ${card.description || "–"}</p>
          <p><strong>Location:</strong> ${card.location}</p>
          <p><strong>Price:</strong> $${card.price}/month</p>
          <p><strong>Posted on:</strong> ${new Date(card.createdAt).toLocaleDateString()}</p>
          ${ownerContact}
        `,
        width: 600,
        confirmButtonText: "Close"
      });
    } catch (err) {
      Swal.fire("Error", "Could not load details", "error");
    }
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!token || !user || user.isBusiness || user.isAdmin) return;

    const method = isFavorited ? "DELETE" : "POST";
    const url = `${API_BASE}/users/favorites/${id}`;
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        },
        // body: JSON.stringify({ cardId: id })
      });
      if (!res.ok) throw new Error("Failed to update favorites");

      setIsFavorited(!isFavorited);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: isFavorited ? "Removed from favorites" : "Added to favorites",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update favorites", "error");
    }
  };

  return (
    <div className="apartment-card" onClick={handleClick}>
      {user && !user.isBusiness && !user.isAdmin && (
    <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorited ? "❤️" : "🤍"}
        </button>
      )}
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{location}</p>
      <p className="price">${price}/month</p>
      <p className="date">Posted on: {date}</p>
    </div>
  );
}
