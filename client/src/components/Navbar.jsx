import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const isStudent = user && !user.isAdmin && !user.isBusiness;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">CampusRent</Link>
        {user && (
          <span className="nav-welcome">
            Welcome, {user.name?.first ?? "User"}
          </span>
        )}
      </div>

      <div className="nav-links">
        <Link to="/" className="btn nav-home">Home</Link>

        {user ? (
          <>
            {isStudent && (
              <Link to="/favorites" className="btn nav-favorites">
                My Favorites
              </Link>
            )}

            {user?.isBusiness && (
              <Link to="/add-apartment" className="btn nav-addapt">
                Add Apartment
              </Link>
            )}

            <button onClick={logout} className="btn nav-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn nav-login">Login</Link>
            <Link to="/signup" className="btn nav-signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
