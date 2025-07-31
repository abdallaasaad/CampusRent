// src/components/ApartmentList.jsx
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import ApartmentCard from "./ApartmentCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/App.css";

export default function ApartmentList() {
  const { token } = useContext(AuthContext);
  const location = useLocation();              // get the query string
  const [apts, setApts] = useState([]);

  useEffect(() => {
    const headers = token ? { "x-auth-token": token } : {};
    const url =
      `${process.env.REACT_APP_BASE_URL || "http://localhost:3001"}/cards` +
      location.search;                         

    fetch(url, { headers })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        // map to the shape ApartmentCard expects
        const mapped = data
          .filter(c => c._id)
          .slice(0, 15)
          .map(c => ({
            id:       c._id,
            title:    c.title,
            location: c.location,
            price:    c.price,
            date:     new Date(c.createdAt).toISOString().split("T")[0],
            image:    c.image.url
          }));
        setApts(mapped);
      })
      .catch(console.error);
  }, [token, location.search]);               // re-run when token or query string changes

  return (
    <div className="apartment-list">
      {apts.map((apt, idx) => (
        <ApartmentCard key={apt.id || idx} {...apt} />
      ))}
    </div>
  );
}
