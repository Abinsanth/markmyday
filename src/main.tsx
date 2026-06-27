import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./index.css"
import { LoginForm } from "./components/LoginForm"
import { SignupForm } from "./components/SignupForm"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Toaster } from "./components/ui/sonner"
import AuthLayout from "./layouts/AuthLayout"
import Dashboard from "./dashboard/Dashboard"
import Attendance from "./features/attendance/Attendance"
import ViewList from "./features/list/ViewList"
import ManageList from "./features/list/ManageList"
import ManageProfile from "./features/profile/ManageProfile"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignupForm />
              </AuthLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="attendance" replace />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="view-lists" element={<ViewList />} />
            <Route path="manage-lists" element={<ManageList />} />
            <Route path="profile" element={<ManageProfile />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
