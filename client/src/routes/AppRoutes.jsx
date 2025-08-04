import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import StudentDashboard from "../pages/StudentDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";
import AddApartment from "../pages/AddApartment";
import MyApartments from "../pages/MyApartments";
import EditUser from "../pages/EditUser";
import EditCard from "../pages/EditCard";
import AdminDashboard from "../pages/AdminDashboard";
import Favorites from "../components/Favorites";

function Protected({ children, roleCheck }) {
  const { user, token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  if (user === null) return null;
  if (roleCheck && !roleCheck(user)) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* admin */}
      <Route
        path="/admin"
        element={
          <Protected roleCheck={u => u.isAdmin}>
            <AdminDashboard />
          </Protected>
        }
      />

      {/* business/owner */}
      <Route
        path="/owner"
        element={
          <Protected roleCheck={u => u.isBusiness}>
            <OwnerDashboard />
          </Protected>
        }
      />
      <Route
        path="/add-apartment"
        element={
          <Protected roleCheck={u => u.isBusiness}>
            <AddApartment />
          </Protected>
        }
      />
      <Route
        path="/my-apartments"
        element={
          <Protected roleCheck={u => u.isBusiness}>
            <MyApartments />
          </Protected>
        }
      />

      {/* student */}
      <Route
        path="/student"
        element={
          <Protected roleCheck={u => !u.isAdmin && !u.isBusiness}>
            <StudentDashboard />
          </Protected>
        }
      />
      <Route
        path="/favorites"
        element={
          <Protected roleCheck={u => !u.isAdmin && !u.isBusiness}>
            <Favorites />
          </Protected>
        }
      />

      {/* admin edits */}
      <Route path="/admin/users/:id/edit" element={
        <Protected roleCheck={u=>u.isAdmin}>
          <EditUser/>
        </Protected>
      } />
      <Route path="/admin/cards/:id/edit" element={
        <Protected roleCheck={u=>u.isAdmin}>
          <EditCard/>
        </Protected>
      } />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}