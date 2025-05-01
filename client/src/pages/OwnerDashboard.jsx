import React from "react";
import MyApartments from "../pages/MyApartments";
import "../styles/App.css";

export default function OwnerDashboard() {
  return (
    <div className="dashboard-page">
      <h2>Owner Dashboard</h2>
      <MyApartments />
    </div>
  );
}
