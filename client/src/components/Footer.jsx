import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Footer.css";



export default function Footer() {
  const { user } = useContext(AuthContext);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h4>CampusRent</h4>
          <p>Connecting students with the perfect apartment near campus.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          {!user && <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </>}
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} CampusRent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
