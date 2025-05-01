// src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/AdminDashboard.css";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function AdminDashboard() {
  const { token, logout } = useContext(AuthContext);
  const [view, setView] = useState("users");       // "users" or "cards"
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    if (view !== "users") return;
    fetch(`${API_BASE}/users`, { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setUsers)
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
        if (err.message === "Unauthorized") logout();
      });
  }, [view, token, logout]);

  // Fetch cards
  useEffect(() => {
    if (view !== "cards") return;
    fetch(`${API_BASE}/cards`, { headers: { "x-auth-token": token } })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setCards)
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
        if (err.message === "Unauthorized") logout();
      });
  }, [view, token, logout]);

  const deleteUser = (id) => {
    Swal.fire({
      title: "Delete this user?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`${API_BASE}/users/${id}`, {
          method: "DELETE",
          headers: { "x-auth-token": token },
        }).then((r) => {
          if (r.ok) {
            setUsers((u) => u.filter((x) => x._id !== id));
            Swal.fire("Deleted", "", "success");
          } else Swal.fire("Error", "", "error");
        });
      }
    });
  };

  const deleteCard = (id) => {
    Swal.fire({
      title: "Delete this card?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`${API_BASE}/cards/${id}`, {
          method: "DELETE",
          headers: { "x-auth-token": token },
        }).then((r) => {
          if (r.ok) {
            setCards((c) => c.filter((x) => x._id !== id));
            Swal.fire("Deleted", "", "success");
          } else Swal.fire("Error", "", "error");
        });
      }
    });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="tabs">
        <button
          className={view === "users" ? "active" : ""}
          onClick={() => setView("users")}
        >
          Users
        </button>
        <button
          className={view === "cards" ? "active" : ""}
          onClick={() => setView("cards")}
        >
          Cards
        </button>
      </div>

      {view === "users" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name.first} {u.name.middle} {u.name.last}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/admin/users/${u._id}/edit`)}>Edit</button>{" "}
                  <button onClick={() => deleteUser(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === "cards" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Posted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((c) => (
              <tr key={c._id}>
                <td>{c.title}</td>
                <td>{c.location}</td>
                <td>${c.price}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => navigate(`/admin/cards/${c._id}/edit`)}>Edit</button>{" "}
                  <button onClick={() => deleteCard(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
