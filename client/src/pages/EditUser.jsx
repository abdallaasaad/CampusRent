// src/pages/EditUser.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BASE = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export default function EditUser() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${BASE}/users/${id}`, {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [id, token]);

  const handleChange = (path, value) => {
    // simple deep updater for nested props like "address.city" or "name.first"
    setUser((u) => {
      const copy = { ...u };
      const keys = path.split(".");
      let cur = copy;
      keys.slice(0, -1).forEach((k) => {
        cur[k] = { ...(cur[k] || {}) };
        cur = cur[k];
      });
      cur[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${BASE}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Save failed (${res.status})`);
        return res.json();
      })
      .then(() => navigate("/admin"))
      .catch((err) => setError(err.message));
  };

  if (error)
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  if (!user) return <div style={{ padding: 20 }}>Loading user…</div>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "1em auto" }}>
      <h2>Edit User</h2>

      <fieldset>
        <legend>Name</legend>
        <label>
          First:
          <input
            type="text"
            placeholder="First name"
            value={user.name.first}
            onChange={(e) => handleChange("name.first", e.target.value)}
            required
          />
        </label>
        <label>
          Middle:
          <input
            type="text"
            placeholder="Middle name"
            value={user.name.middle || ""}
            onChange={(e) => handleChange("name.middle", e.target.value)}
          />
        </label>
        <label>
          Last:
          <input
            type="text"
            placeholder="Last name"
            value={user.name.last}
            onChange={(e) => handleChange("name.last", e.target.value)}
            required
          />
        </label>
      </fieldset>

      <label>
        Phone:
        <input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={user.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          required
        />
      </label>

      <fieldset>
        <legend>Address</legend>
        <label>
          State:
          <input
            type="text"
            placeholder="State"
            value={user.address.state || ""}
            onChange={(e) => handleChange("address.state", e.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            placeholder="Country"
            value={user.address.country || ""}
            onChange={(e) => handleChange("address.country", e.target.value)}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            placeholder="City"
            value={user.address.city}
            onChange={(e) => handleChange("address.city", e.target.value)}
            required
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            placeholder="Street"
            value={user.address.street}
            onChange={(e) => handleChange("address.street", e.target.value)}
          />
        </label>
        <label>
          House #: 
          <input
            type="number"
            placeholder="House Number"
            value={user.address.houseNumber || ""}
            onChange={(e) =>
              handleChange("address.houseNumber", +e.target.value)
            }
          />
        </label>
        <label>
          ZIP:
          <input
            type="number"
            placeholder="ZIP Code"
            value={user.address.zip || ""}
            onChange={(e) => handleChange("address.zip", +e.target.value)}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Profile Image</legend>
        <label>
          Image URL:
          <input
            type="url"
            placeholder="https://..."
            value={user.image?.url || ""}
            onChange={(e) => handleChange("image.url", e.target.value)}
          />
        </label>
        <label>
          Alt text:
          <input
            type="text"
            placeholder="Image description"
            value={user.image?.alt || ""}
            onChange={(e) => handleChange("image.alt", e.target.value)}
          />
        </label>
      </fieldset>

      <button type="submit" style={{ marginTop: "1em", padding: "0.5em 1em" }}>
        Save Changes
      </button>
    </form>
  );
}
