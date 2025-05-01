// components/Login.jsx
import React from "react";
import LoginForm from "./LoginForm";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Welcome Back</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;