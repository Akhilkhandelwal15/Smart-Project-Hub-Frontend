import { Navigate, Route, Routes } from "react-router-dom";
import { ProjectCreate } from "../features/project/ProjectCreate";
import { ProjectDetail } from "../features/project/ProjectDetail";
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
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route path="/projects/:projectId" 
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <ProjectDetail />
          </PrivateRoute>
        }
      />

      <Route path="/project/create" 
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <ProjectCreate />
          </PrivateRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes;