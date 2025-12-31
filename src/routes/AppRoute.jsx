import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";

const AppRoutes = ()=>{
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
        } 
      />
      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
        } 
      />

      {/* Private routes */}
      <Route path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes;