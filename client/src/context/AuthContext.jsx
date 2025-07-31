// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  // stable logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    fetch(
      `${process.env.REACT_APP_BASE_URL || "http://localhost:3001"}/users/me`,
      { headers: { "x-auth-token": token } }
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(data => {
        setUser(data);

        // only auto-redirect if we're still on a public page
        const p = location.pathname;
        if (p === "/" || p === "/login" || p === "/signup") {
          if (data.isAdmin)    navigate("/admin",   { replace: true });
          else if (data.isBusiness) navigate("/owner",   { replace: true });
          else                   navigate("/student", { replace: true });
        }
      })
      .catch(() => logout());
  }, [token, logout, location.pathname]);

  function login(tok) {
    localStorage.setItem("token", tok);
    setToken(tok);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
