// src/components/ApartmentCard.jsx
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import "../styles/ApartmentCard.css";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function ApartmentCard({ id, title, location, price, date, image }) {
  const { token, user } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      const res = await fetch(`${API_BASE}/cards/${id}`, {
        headers: token ? { "x-auth-token": token } : {}
      });
      if (!res.ok) throw new Error(res.statusText);
      const card = await res.json();

      // build content
      const ownerContact = user && !user.isBusiness
        ? `<p><strong>Owner phone:</strong> ${card.ownerPhone || "N/A"}</p>`
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

  return (
    <div className="apartment-card" onClick={handleClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{location}</p>
      <p className="price">${price}/month</p>
      <p className="date">Posted on: {date}</p>
    </div>
  );
}
