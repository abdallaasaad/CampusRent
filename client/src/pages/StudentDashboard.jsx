import React from "react";
import ApartmentList from "../components/ApartmentList";
import "../styles/App.css";

export default function StudentDashboard() {
  return (
    <div className="dashboard-page">
      <h2>Student Dashboard</h2>
      <ApartmentList />
    </div>
  );
}
