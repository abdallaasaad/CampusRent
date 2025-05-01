import React from "react";
import "../styles/App.css";
import ApartmentList from "../components/ApartmentList";

export default function HomePage() {
  return (
    <>
      <header className="hero enhanced-hero">
        <h1>Find Your Perfect Apartment Near Campus</h1>
        <p>Explore the newest listings around your university</p>
      </header>
      <ApartmentList />
    </>
  );
}
