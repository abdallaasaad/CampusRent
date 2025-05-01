import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL||"http://localhost:3001"}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      const data = JSON.parse(text);
      login(data.token);
      Swal.fire("Success", "Logged in!", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  }
  return (
    <div className="form-page">
      <form onSubmit={handleSubmit} className="form-grid">
        <h2 className="form-title">Login</h2>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <button type="submit" className="btn gradient-btn">Login</button>
      </form>
    </div>
  );
}