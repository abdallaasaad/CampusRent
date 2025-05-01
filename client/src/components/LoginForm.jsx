// components/LoginForm.jsx
import React from "react";
import "../styles/Login.css";

function LoginForm() {
  return (
    <form className="login-form">
      <label>Email</label>
      <input type="email" placeholder="Enter your email" required />

      <label>Password</label>
      <input type="password" placeholder="Enter your password" required />

      <button type="submit" className="btn submit-btn">Login</button>
    </form>
  );
}

export default LoginForm;