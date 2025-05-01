import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">CampusRent</Link>

      <div className="nav-links">
        {user ? (
          // only render welcome when we have a name object
          <>
            <span className="nav-welcome">
              Welcome, {user.name?.first ?? "User"}
            </span>
            <button onClick={logout} className="btn nav-logout">
              Logout
            </button>
            {user?.isBusiness && <Link to="/add-apartment">Add Apartment</Link>}
          </>
        ) : (
          <>
            <Link to="/login" className="btn nav-login">Login</Link>
            <Link to="/signup" className="btn nav-signup">Signup</Link>
            {user?.isBusiness && <Link to="/add-apartment">Add Apartment</Link>}
          </>
        )}
      </div>
    </nav>
  );
}
