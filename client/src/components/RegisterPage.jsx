// components/RegisterPage.jsx
import React from "react";
import SignupForm from "./SignupForm";
import "../styles/Login.css";

function RegisterPage() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <h2 className="login-title">Create Your Account</h2>
        <SignupForm />
      </div>
    </div>
  );
}

export default RegisterPage;